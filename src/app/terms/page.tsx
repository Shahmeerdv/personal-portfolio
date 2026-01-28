import LegalPageLayout from "@/components/LegalPageLayout";

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" date="January 28, 2026">
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
        <p>By purchasing and downloading digital assets from shahmeer.tech, you agree to be bound by these Terms of Service. If you do not agree, please do not use our products.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">2. License to Use</h2>
        <p>When you purchase a digital asset (PSD, Template, Graphic), you are granted a non-exclusive, non-transferable license to use the product for personal or commercial projects.</p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li><span className="text-white">You MAY:</span> Use the designs for your own social media, client work, or personal portfolio.</li>
          <li><span className="text-white">You MAY NOT:</span> Resell, redistribute, or share the source files (PSDs) with others. You cannot claim the templates as your own work for resale.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
        <p>All digital products remain the intellectual property of [Your Website Name]. The purchase provides you a license to use the asset, not ownership of the original copyright.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
        <p>Our products are provided "as is." We are not liable for any direct, indirect, or consequential loss arising from the use of our templates.</p>
      </section>
    </LegalPageLayout>
  );
}