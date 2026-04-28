"use client";

import BlogList from "@/components/BlogList";
import LoadingBlogList from "@/components/LoadingBlogList";
// import BlogList from "@/components/BlogList";
// import LoadingBlogList from "@/components/LoadingBlogList";
import { roboto_mono, space_mono } from "@/lib/font";
import { PostsListData } from "@/lib/type";
import { useEffect, useState } from "react";

export default function Home() {
	const [data, setData] = useState<PostsListData[] | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const res = await fetch("/api/blogs");
				const { data } = await res.json();
				setData(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

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
						Data Engineer, Data Analyst, and Data Scientist passionate about
						building reliable, scalable data infrastructure. I design ETL/ELT
						pipelines, real-time streaming systems, and analytics platforms
						using Spark, Kafka, Airflow, Delta Lake, and dbt, with a focus on
						fintech, remittance, and digital wallet applications.
					</p>
				</div>

				{loading ? <LoadingBlogList /> : <BlogList list={data} />}
			</div>
		</>
	);
}
