import LegalPageLayout from "@/components/LegalPageLayout";

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" date="January 28, 2026">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
        <p>We collect only the information necessary to process your order and deliver your digital products. This typically includes your email address, name, and billing country.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">2. Payment Processing</h2>
        <p>We use <strong>Paddle.com</strong> as our Merchant of Record. We do not store or have access to your credit card details. All financial transactions are handled securely by Paddle's encrypted payment gateway.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
        <p>We use your email address to:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Send you the download link for your purchased products.</li>
          <li>Notify you of critical updates to the products you purchased.</li>
          <li>Respond to customer support inquiries.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">4. Cookies</h2>
        <p>Our website uses essential cookies to maintain the functionality of the shopping cart and checkout process.</p>
      </section>
    </LegalPageLayout>
  );
}