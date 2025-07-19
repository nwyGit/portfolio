import React, { useState } from 'react';
import { PortableText } from '@portabletext/react';
import { BlogFAQWithLanguage, Language } from '../type/types';
import { getLocalizedMessages } from '@/utils/languageUtils';

interface BlogFAQSectionProps {
	faqs: BlogFAQWithLanguage[];
	language: Language;
}

interface FAQItemProps {
	faq: BlogFAQWithLanguage;
	isOpen: boolean;
	onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, onToggle }) => {
	return (
		<div className="border border-gray-200 rounded-lg overflow-hidden">
			<button
				onClick={onToggle}
				className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
				aria-expanded={isOpen}
			>
				<div className="flex justify-between items-center">
					<h3 className="text-lg font-medium text-gray-900 pr-8">
						{faq.question}
					</h3>
					<svg
						className={`flex-shrink-0 w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
							isOpen ? 'rotate-180' : ''
						}`}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			</button>
			
			<div
				className={`overflow-hidden transition-all duration-300 ease-in-out ${
					isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
				}`}
			>
				<div className="px-6 py-4 bg-white">
					<div className="prose prose-sm max-w-none text-gray-700">
						<PortableText value={faq.answer} />
					</div>
				</div>
			</div>
		</div>
	);
};

const BlogFAQSection: React.FC<BlogFAQSectionProps> = ({ faqs, language }) => {
	const [openItems, setOpenItems] = useState<Set<string>>(new Set());
	const messages = getLocalizedMessages(language);

	const toggleItem = (id: string) => {
		const newOpenItems = new Set(openItems);
		if (newOpenItems.has(id)) {
			newOpenItems.delete(id);
		} else {
			newOpenItems.add(id);
		}
		setOpenItems(newOpenItems);
	};

	const toggleAll = () => {
		if (openItems.size === faqs.length) {
			setOpenItems(new Set());
		} else {
			setOpenItems(new Set(faqs.map(faq => faq._id)));
		}
	};

	// Group FAQs by category
	const faqsByCategory = faqs.reduce((acc, faq) => {
		const category = faq.category;
		if (!acc[category]) {
			acc[category] = [];
		}
		acc[category].push(faq);
		return acc;
	}, {} as Record<string, BlogFAQWithLanguage[]>);

	const categoryLabels = {
		general: language === 'en' ? 'General' : '一般問題',
		technical: language === 'en' ? 'Technical' : '技術問題',
		implementation: language === 'en' ? 'Implementation' : '實作問題',
		troubleshooting: language === 'en' ? 'Troubleshooting' : '故障排除',
		'best-practices': language === 'en' ? 'Best Practices' : '最佳實務',
	};

	if (faqs.length === 0) {
		return null;
	}

	return (
		<section className="bg-gray-50 rounded-lg p-6 md:p-8">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl md:text-3xl font-bold text-gray-900">
					{messages.faq}
				</h2>
				<button
					onClick={toggleAll}
					className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
				>
					{openItems.size === faqs.length 
						? (language === 'en' ? 'Collapse All' : '收起全部')
						: (language === 'en' ? 'Expand All' : '展開全部')
					}
				</button>
			</div>

			<div className="space-y-6">
				{Object.entries(faqsByCategory).map(([category, categoryFaqs]) => (
					<div key={category}>
						{Object.keys(faqsByCategory).length > 1 && (
							<h3 className="text-lg font-semibold text-gray-800 mb-3">
								{categoryLabels[category as keyof typeof categoryLabels] || category}
							</h3>
						)}
						<div className="space-y-2">
							{categoryFaqs.map((faq) => (
								<FAQItem
									key={faq._id}
									faq={faq}
									isOpen={openItems.has(faq._id)}
									onToggle={() => toggleItem(faq._id)}
								/>
							))}
						</div>
					</div>
				))}
			</div>

			{/* Schema markup for FAQ */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "FAQPage",
						mainEntity: faqs.map(faq => ({
							"@type": "Question",
							name: faq.question,
							acceptedAnswer: {
								"@type": "Answer",
								text: faq.answer.map(block => {
									if (block._type === 'block' && block.children) {
										return block.children.map(child => child.text).join('');
									}
									return '';
								}).join(' '),
							},
						})),
					}),
				}}
			/>
		</section>
	);
};

export default BlogFAQSection;