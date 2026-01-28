import LegalPageLayout from "@/components/LegalPageLayout";

export default function RefundPage() {
  return (
    <LegalPageLayout title="Refund Policy" date="January 28, 2026">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Digital Products Policy</h2>
        <p>Due to the nature of digital assets (instant download), <strong>all sales are final and non-refundable</strong>. Once a file has been downloaded, it cannot be returned.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Exceptions</h2>
        <p>We want you to be happy with your purchase. We may offer a refund or replacement under the following specific circumstances:</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>The file is technically corrupted or defective and cannot be opened.</li>
          <li>The product description was significantly misleading (e.g., missing files promised in the description).</li>
          <li>A duplicate purchase was made by accident.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">How to Request Support</h2>
        <p>If you have issues with a file, please contact us at <strong>mshahmeer86@gmail.com</strong>. We are committed to fixing any technical issues you encounter.</p>
      </section>
    </LegalPageLayout>
  );
}