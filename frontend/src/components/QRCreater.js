import React, { useState, useEffect } from "react";
import Barcode from "react-barcode";
import axios from "axios";

const QRCreater = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [numberOfBarcodes, setNumberOfBarcodes] = useState(1);
  const [location, setLocation] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [username, setUsername] = useState("");
  const [batchNumbers, setBatchNumbers] = useState([]);

  // Fetch location using OpenCage API or reverse geolocation API
  const fetchLocation = async (lat, long) => {
    const apiKey = "1a49c2f11ba74841bb2b563c7569b33c"; // Replace with your OpenCage API key
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${apiKey}`
      );
      const { city, state, country } = response.data.results[0].components;
      setLocation(`${city || ""}, ${state}, ${country || ""}`);
    } catch (error) {
      console.error("Error fetching location:", error);
      setLocation("Location Unavailable");
    }
  };

  // Get current time and location on component mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchLocation(latitude, longitude); // Automatically get location from the device
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocation("Location Unavailable");
      }
    );

    // Set current time
    const date = new Date();
    setCurrentTime(date.toLocaleString());
  }, []);

  // Function to handle printing only the barcode div
  const handlePrint = (index) => {
    let printContent;

    if (index === "total") {
      printContent = document.getElementById("barcode-total");
    } else {
      printContent = document.getElementById(`barcode-div-${index}`);
    }

    if (printContent) {
      const newWindow = window.open("", "_blank", "width=800,height=600");
      newWindow.document.write(`
        <html>
          <head>
            <style>
              body { margin: 0; padding: 20px; font-size: small; background-color: white; color: black; }
              #barcode-div-${index} {
                border: 1px solid black;
                padding: 10px;
                text-align: left;
                font-size: 10px;
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      newWindow.document.close();
      newWindow.focus();
      newWindow.print();
      newWindow.close();
    }
  };

  // Handle batch number collection and increment
  useEffect(() => {
    if (batchNumber) {
      const startBatchNumber = parseInt(batchNumber);
      setBatchNumbers(
        Array.from({ length: numberOfBarcodes }, (_, index) => startBatchNumber + index)
      );
    }
  }, [batchNumber, numberOfBarcodes]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Generate Barcodes</h2>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Enter Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter Batch Number"
          value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Number of Barcodes"
          value={numberOfBarcodes}
          onChange={(e) => setNumberOfBarcodes(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      {/* Generate individual barcodes */}
      {Array.from({ length: numberOfBarcodes }).map((_, index) => (
        <div
          id={`barcode-div-${index}`}
          key={index}
          style={styles.barcodeContainer}
        >
          <Barcode
            value={`${productName}-${price}-${batchNumbers[index]}`}
            width={1}
            height={30}
            fontSize={10}
          />

          <div style={styles.barcodeDetails}>
            <p>Product: {productName}</p>
            <p>Price: {price}</p>
            <p>Batch Number: {batchNumbers[index]}</p>
            <p>Location: {location}</p>
            <p>Time: {currentTime}</p>
            <p>Username: {username}</p>
          </div>
        </div>
      ))}

      {/* Print button outside the div */}
      {Array.from({ length: numberOfBarcodes }).map((_, index) => (
        <button
          key={index}
          onClick={() => handlePrint(index)}
          style={styles.printButton}
        >
          Print Barcode {index + 1}
        </button>
      ))}

      {/* Final barcode with the start and end batch numbers */}
      <div
        id="barcode-total"
        style={styles.finalBarcodeContainer}
      >
        <h3 style={styles.finalBarcodeHeading}>Final Barcode</h3>

        <Barcode
          value={`Batch-${batchNumbers[0]}-to-${batchNumbers[batchNumbers.length - 1]}`}
          width={1}
          height={30}
          fontSize={10}
        />
        <div style={styles.barcodeDetails}>
          <p>Product: {productName}</p>
          <p>Batch Numbers: {batchNumbers[0]} to {batchNumbers[batchNumbers.length - 1]}</p>
          <p>Location: {location}</p>
          <p>Time: {currentTime}</p>
          <p>Username: {username}</p>
        </div>
      </div>

      {/* Print final barcode */}
      <button onClick={() => handlePrint("total")} style={styles.printButton}>
        Print Final Barcode
      </button>
    </div>
  );
};

// Styles for the QRCreater component
const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "800px",
    margin: "auto",
  },
  heading: {
    color: "#333",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    maxWidth: "350px",
    margin: "0 auto",
  },
  barcodeContainer: {
    margin: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    backgroundColor: "white",
    textAlign: "left",
    fontSize: "10px",
    fontWeight: "bold",
    display: "inline-block",
    width: "200px",
  },
  barcodeDetails: {
    fontSize: "12px",
    marginTop: "10px",
    color: "#555",
  },
  printButton: {
    margin: "10px",
    padding: "8px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  finalBarcodeContainer: {
    margin: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    backgroundColor: "white",
    textAlign: "left",
    fontSize: "10px",
    fontWeight: "bold",
    display: "inline-block",
    width: "100%",
  },
  finalBarcodeHeading: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
};

export default QRCreater;
