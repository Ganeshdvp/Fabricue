import { useState } from "react"

export const Faqs = () => {
    const [openIndex, setOpenIndex] = useState(null)
    const faqsData = [
        {
            question: 'How long does delivery take?',
            answer: 'We typically deliver within 3–7 business days depending on your location. You’ll receive tracking details once your order is shipped.'
        },
        {
            question: 'Do you offer returns or exchanges?',
            answer: 'Yes, we offer hassle-free returns and exchanges within 7 days of delivery, provided the item is unused and in original condition.'
        },
        {
            question: 'Are your products true to size?',
            answer: 'Yes, our products follow standard sizing guidelines. We recommend checking the size chart on each product page for the perfect fit.'
        },
        {
            question: 'Is my payment information secure?',
            answer: 'Absolutely. All payments are processed through secure and encrypted gateways to ensure your data remains safe.'
        },
        {
            question: 'How can I contact customer support?',
            answer: 'You can reach our support team via email or through the contact form on our website. We’re here to help you with any questions or concerns.'
        }
    ]
  return (
    <>
    <div id="faqs" className='flex flex-col items-center text-center text-slate-800 px-3 mt-36'>
                <h1 className='text-3xl md:text-4xl font-semibold mt-2'>Frequently Asked Questions</h1>
                <p className='text-sm text-slate-500 mt-4 max-w-sm'>
                    Proactively answering FAQs boosts user confidence and cuts down on support tickets.
                </p>
                <div className='max-w-4xl w-full mt-6 flex flex-col gap-4 items-start text-left'>
                    {faqsData.map((faq, index) => (
                        <div key={index} className='flex flex-col items-start w-full'>
                            <div className='flex items-center justify-between w-full cursor-pointer border border-indigo-100 p-4 rounded' onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                                <h2 className='text-sm'>{faq.question}</h2>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}>
                                    <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#1D293D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className={`text-sm text-slate-500 px-4 transition-all duration-500 ease-in-out ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`} >
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
    </>
  )
}
