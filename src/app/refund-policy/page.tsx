import LegalPageLayout from "@/components/LegalPageLayout";

export default function RefundPage() {
  return (
    <LegalPageLayout title="Refund Policy" date="February 03, 2026">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">14-Day Money-Back Guarantee</h2>
        <p>
          We want you to be completely satisfied with your purchases and product. In compliance with consumer protection standards, we offer a **full 14-day refund window** for all digital products purchased through our store.
        </p>
        <p className="mt-4">
          If you are not satisfied with the product that you have purchased from us, you are eligible for a full reimbursement within 14 calendar days of your purchase.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">No Questions Asked</h2>
        <p>
          To exercise your right of cancellation, you do not need to provide a specific reason, though feedback is appreciated. Simply contact us within the 14-day period to initiate the refund process.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">How to Request a Refund</h2>
        <p>
          Please email us at <strong>mshahmeer86@gmail.com</strong> with your Order ID. We will process your refund via Paddle immediately. The funds typically return to your bank account within 5-10 business days depending on your bank.
        </p>
      </section>
    </LegalPageLayout>
  );
}