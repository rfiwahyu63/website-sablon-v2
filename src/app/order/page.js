"use client";

import { useState } from "react";
import OrderForm from "@/components/order/OrderForm/OrderForm";
import OrderSummary from "@/components/order/OrderSummary";
import Payment from "@/components/order/Payment";
import OrderSuccess from "@/components/order/OrderSuccess";

export default function OrderPage() {
  const [order, setOrder] = useState(null);
  const [step, setStep] = useState("form");

  function handleSubmitOrder(data) {
    setOrder(data);
    setStep("summary");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleContinuePayment() {
    setStep("payment");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleConfirmPayment(pembayaran) {
    const now = new Date();

    const tanggal = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("");

    const nomorAcak = crypto
      .randomUUID()
      .replace(/-/g, "")
      .slice(0, 4)
      .toUpperCase();

    const orderId = `RFI-${tanggal}-${nomorAcak}`;

    const updatedOrder = {
      ...order,

      orderId,

      status: "WAITING_CONFIRMATION",

      pembayaran,
    };

    console.log("ORDER RESMI:", updatedOrder);

    setOrder(updatedOrder);
    setStep("success");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  function handleBack() {
    setStep("form");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleBackToSummary() {
    setStep("summary");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      {step === "form" && <OrderForm onSubmitOrder={handleSubmitOrder} />}

      {step === "summary" && (
        <OrderSummary
          order={order}
          onBack={handleBack}
          onContinue={handleContinuePayment}
        />
      )}

      {step === "payment" && (
        <Payment
          order={order}
          onBack={handleBackToSummary}
          onConfirm={handleConfirmPayment}
        />
      )}

      {step === "success" && ( 
        <OrderSuccess order={order} /> 
      )}
    </>
  );
}
