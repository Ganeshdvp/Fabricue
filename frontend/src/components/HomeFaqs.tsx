import { useState, type FC } from "react";
import { Link } from "react-router";


interface Faqs {
  readonly question: string,
  readonly answer: string
}


 const faqsData: Faqs[] = [
    {
      question: "How long does delivery take?",
      answer:
        "We typically deliver within 3–7 business days depending on your location. You'll receive tracking details once your order is shipped.",
    },
    {
      question: "Do you offer returns or exchanges?",
      answer:
        "Yes, we offer hassle-free returns and exchanges within 7 days of delivery, provided the item is unused and in original condition.",
    },
    {
      question: "Are your products true to size?",
      answer:
        "Yes, our products follow standard sizing guidelines. We recommend checking the size chart on each product page for the perfect fit.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Absolutely. All payments are processed through secure and encrypted gateways to ensure your data remains safe at all times.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our support team via email or through the contact form on our website. We're always here to help with any questions.",
    },
    {
      question: "Do you ship outside India?",
      answer:
        "Currently we ship across all major cities and towns in India. International shipping is coming soon — stay tuned for updates!",
    },
  ];

export const HomeFaqs: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="relative bg-white overflow-hidden px-5 py-20 sm:py-12">

      {/* Background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-75 bg-amber-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-40 pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-amber-600">
                FAQs
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
              Got questions?
              <br />
              <span className="text-amber-500">We've got answers.</span>
            </h2>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs lg:text-right lg:mb-1">
            Can't find what you're looking for? Reach out to our support team
            and we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Two column layout on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`group relative bg-white border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
                  ${isOpen
                    ? "border-amber-300 shadow-lg shadow-amber-50"
                    : "border-gray-200 hover:border-amber-200 hover:shadow-md hover:shadow-amber-50/50"
                  }`}
              >
                {/* Accent left bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-0.75 bg-amber-500 transition-all duration-300
                  ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`}
                />

                {/* Question row */}
                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold tabular-nums transition-colors duration-200
                      ${isOpen ? "text-amber-500" : "text-gray-300 group-hover:text-amber-300"}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className={`text-sm font-semibold leading-snug transition-colors duration-200
                      ${isOpen ? "text-gray-900" : "text-gray-700"}`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  {/* Icon */}
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center border transition-all duration-300
                    ${isOpen
                      ? "bg-amber-500 border-amber-500"
                      : "bg-gray-50 border-gray-200 group-hover:border-amber-200 group-hover:bg-amber-50"
                    }`}
                  >
                    <svg
                      className={`w-3.5 h-3.5 transition-all duration-300
                        ${isOpen ? "text-white rotate-45" : "text-gray-400 group-hover:text-amber-400"}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>

                {/* Answer */}
                <div className={`transition-all duration-300 ease-in-out overflow-hidden
                  ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="px-6 pb-5 ml-10">
                    <div className="h-px bg-gray-100 mb-4" />
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 bg-linear-to-r from-amber-50 to-amber-100/60 border border-amber-200 rounded-2xl px-8 py-7">
          <div className="text-center sm:text-left">
            <p className="text-base font-bold text-gray-900 mb-1">
              Still have questions?
            </p>
            <p className="text-sm text-gray-500">
              Our support team is available Monday–Saturday, 9am–6pm IST.
            </p>
          </div>
          <Link
            to="/home/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:scale-95 transition-all text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-sm shadow-amber-200"
          >
            Contact Support
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
};