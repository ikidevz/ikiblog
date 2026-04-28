"use client";
import { roboto_mono, space_mono } from "@/lib/font";
import { HeadingsData } from "@/lib/type";
import { useState, useEffect } from "react";

const TableContents = () => {
	const [isFixed, setIsFixed] = useState(false);
	const [divTop, setDivTop] = useState(0);
	const [headings, setHeadings] = useState<HeadingsData[]>([]);
	const [headingIds, setHeadingIds] = useState<string[]>([]);

	useEffect(() => {
		const div = document.getElementById("sticky-div");
		if (div) {
			const rect = div.getBoundingClientRect();
			setDivTop(rect.top + window.scrollY);
		}

		const handleScroll = () => {
			if (window.scrollY > divTop) {
				setIsFixed(true);
			} else {
				setIsFixed(false);
			}
		};

		const scrapeArticleContent = () => {
			const contentDiv = document.getElementById("article_content");
			if (contentDiv) {
				const headingElements = contentDiv.querySelectorAll("h1, h2, h3, h4");

				const headingData = Array.from(headingElements).map(
					(heading, index) => {
						const text =
							(heading as HTMLElement).innerText ||
							(heading as HTMLElement).textContent ||
							"";
						const id = `heading-${index}`;
						heading.setAttribute("id", id);
						return { text, id, tag: heading.tagName.toLowerCase() };
					},
				);

				setHeadings(headingData);
				setHeadingIds(headingData.map((item) => item.id));
			}
		};

		scrapeArticleContent();

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [divTop]);

	const handleScrollTo = (id: string) => {
		const target = document.getElementById(id);
		if (target) {
			target.scrollIntoView({ behavior: "smooth" });
		}
	};
	return (
		<div
			className={`w-[25%] h-full hidden xl:block ${
				isFixed ? "sticky top-5" : "static top-auto"
			}`}
			id='sticky-div'>
			<p className={`font-medium mb-4 text-lg ${roboto_mono.className}`}>
				Table of Contents
			</p>

			<ul className='overflow-y-auto overflow-x-hidden h-200'>
				{headings.map((item, i) => (
					<li
						key={i}
						className={`pt-4 ${
							item.tag === "h3" ? "pl-4" : item.tag === "h4" ? "pl-6" : "pl-0"
						}`}>
						<button
							onClick={() => handleScrollTo(headingIds[i])}
							className={`text-base  ${
								item.tag == "h3" ? "" : "font-medium"
							}  ${space_mono.className} text-left hover:font-bold`}>
							{item.text}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TableContents;
