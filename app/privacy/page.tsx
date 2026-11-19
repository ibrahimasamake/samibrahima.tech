import { PageHeader } from "@/components/layout/page-header";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: "How this website handles the information you send through the project enquiry and contact forms.",
  path: "/privacy",
});

const updated = "19 November 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Privacy policy", path: "/privacy" }]} title="Privacy policy" lead={`Last updated: ${updated}.`} />
      <div className="container-page py-14 sm:py-20">
        <div className="prose-body max-w-3xl space-y-10 text-[17px]">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-fg">Who is responsible</h2>
            <p>
              This website is run by {profile.name}. For any question about your data, email{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-semibold text-fg">What is collected, and why</h2>
            <p>
              When you send the project enquiry or the contact form, the information you type (name, business name, email,
              optional WhatsApp number, country and your message or project details) is used for one purpose: to reply to
              you about your request.
            </p>
            <p>
              This website has no database. When you press send, your message is passed to Web3Forms, a form-to-email
              service, which delivers it to our inbox. If that service is not available, your own email app opens with the
              message ready, and nothing is sent until you press send there.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-semibold text-fg">How long it is kept</h2>
            <p>
              Enquiry emails are kept in our mailbox for as long as needed to discuss and, if we work together, deliver your
              project, and deleted on request. Your details are never sold, rented or added to a mailing list.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-semibold text-fg">Cookies and analytics</h2>
            <p>
              This website does not use advertising or tracking cookies. A small item in your browser&apos;s local storage
              remembers your light or dark theme choice. The hosting provider (GitHub Pages) and the form service may keep standard technical logs, such as IP
              address and request time, for security and to block abuse.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-semibold text-fg">Your rights</h2>
            <p>
              You can ask to see, correct or delete the information you sent at any time by emailing{" "}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>. Depending on where you live (for example under the
              GDPR or India&apos;s Digital Personal Data Protection Act), you may also have the right to complain to a data
              protection authority.
            </p>
          </section>
          <section>
            <h2 className="mb-3 text-xl font-semibold text-fg">Changes</h2>
            <p>If this policy changes, the date at the top of this page will change too.</p>
          </section>
        </div>
      </div>
    </>
  );
}
