import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Line } from "recharts";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";
import {
  BarChart,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import "./Dashboard.css";

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [orders, setOrders] = useState([]);

  // ✅ Fetch Sales Data
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/auth/admin/sales"
        );
        const data = await response.json();
        console.log("Sales Data:", data);
        setSalesData(data);
      } catch (error) {
        console.error("Failed to fetch sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  // ✅ Fetch Order Data to Get Customer Details
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/auth/order/allorders"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          const ordersWithDetails = data.orders
            .filter((order) => order.paymentType === "Advance Payment") // ✅ Filter only advance payments
            .map((order) => ({
              orderId: order._id,
              customerName: `${order.address?.firstName} ${order.address?.lastName}`,
              customerPhone: order.address?.phone,
              amount: order.amount,
              status: order.status,
            }));
          setOrders(ordersWithDetails);
          setPendingPayments(
            ordersWithDetails.filter(
              (order) => order.status !== "Paid & Collected"
            )
          );
        }
      } catch (error) {
        console.error("Failed to fetch order data:", error);
      }
    };

    fetchOrderData();
  }, []);

  // ✅ Generate PDF Report with Customer Details
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Niranjan Jewellers", 70, 10);
    doc.setFontSize(14);
    doc.text("Sales & Payment Report", 70, 20);

    let yPos = 30;

    // ✅ Draw Table for Sales Data
    doc.setFontSize(12);
    doc.text("Monthly Sales Data:", 10, yPos);
    yPos += 10;

    const salesHeaders = ["Month", "Amount (Rs)"];
    const salesRows = salesData.map((data) => [
      data.month,
      `Rs. ${data.amount}`,
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [salesHeaders],
      body: salesRows,
      theme: "striped",
    });

    yPos = doc.lastAutoTable.finalY + 10;

    // ✅ Draw Table for Pending Payments
    doc.text("Pending Payments:", 10, yPos);
    yPos += 10;

    const paymentHeaders = [
      "Order ID",
      "Customer Details",
      "Amount",
      "Status",
    ];
    const paymentRows = pendingPayments.map((payment) => [
      payment.orderId,
      `${payment.customerName}\nPh: ${payment.customerPhone}`,
      `Rs. ${payment.amount}`,
      payment.status,
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [paymentHeaders],
      body: paymentRows,
      theme: "striped",
      styles: { cellPadding: 3, fontSize: 10 },
    });

    doc.save("niranjan_jewellers_report.pdf");
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-section">
        <h3>Monthly Sales Report</h3>
        <BarChart
          width={600}
          height={300}
          data={salesData}
          margin={{ top: 20, right: 30, left: 50, bottom: 30 }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </div>

      <div className="dashboard-section">
        <h3>Yearly Sales Report</h3>
        <LineChart
          width={600}
          height={300}
          data={salesData}
          margin={{ top: 20, right: 30, left: 50, bottom: 30 }}
        >
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
        </LineChart>
      </div>

      <div className="dashboard-section">
        <h3>Pending Payments</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Details</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingPayments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.orderId}</td>
                <td>
                  {payment.customerName}
                  <br />
                  Ph: {payment.customerPhone}
                </td>
                <td>Rs. {payment.amount}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dashboard-section button-group">
        <button onClick={generatePDF}>Generate PDF Report</button>
        <CSVLink data={salesData} filename="niranjan_jewellers_report.csv">
          <button>Download CSV Report</button>
        </CSVLink>
      </div>
    </div>
  );
};

export default Dashboard;
