"use client";

// import BlogList from "@/components/BlogList";
// import LoadingBlogList from "@/components/LoadingBlogList";
import { roboto_mono, space_mono } from "@/lib/font";
import { PostsListData } from "@/lib/type";
import { useEffect, useState } from "react";

export default function Home() {
	const [data, setData] = useState<PostsListData[] | null>(null);
	const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			setLoading(true);
	// 			const res = await fetch("/api/blogs");
	// 			const { data } = await res.json();
	// 			setData(data);
	// 		} catch (error) {
	// 			console.error("Error fetching data:", error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	fetchData();
	// }, []);

	return (
		<>
			<div className='container mx-auto w-full'>
				<div className='text-center my-20'>
					<h1
						className={`text-4xl sm:text-6xl font-bold ${space_mono.className}`}>
						Project Blogs
					</h1>
					<p
						className={`mt-10 max-w-175 m-auto text-xs sm:text-base leading-5 ${roboto_mono.className}`}>
						Welcome to my project blog, where I showcase my hands-on journey
						across Data Engineering, Data Analysis, and Data Science. I build
						production-grade data platforms using modern technologies like
						Spark, Kafka, Airflow, Delta Lake, dbt, and Great Expectations —
						implementing scalable ETL/ELT pipelines, medallion architectures,
						real-time streaming, and dimensional modeling, with a strong focus
						on fintech, remittance, and digital wallet systems. Alongside this,
						I deliver deep data analysis and interactive visualizations that
						transform raw transaction data into actionable business insights,
						while also exploring Data Science projects such as fraud detection
						patterns and predictive modeling. This space reflects my passion for
						building reliable data infrastructure, uncovering meaningful
						insights, and solving real-world problems with clean, scalable
						solutions.
					</p>
				</div>
			</div>
		</>
	);
}
