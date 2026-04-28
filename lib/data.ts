import { CategoryData, SocialType } from "./type";

import { FaXTwitter } from "react-icons/fa6";
import { FaGithub, FaKaggle, FaLinkedin } from "react-icons/fa";
import { Option } from "@/components/ui/multiple-selector";

export const categories: CategoryData[] = [
	{ value: "all", name: "All" },
	{ value: "data-analyst", name: "Data Analyst" },
	{ value: "data-engineering", name: "Data Engineering" },
	{ value: "data-science", name: "Data Science" },
	{ value: "visualization", name: "Visualization" },
	{ value: "data-pipeline", name: "Data Pipeline" },
	{ value: "resources", name: "Resources" },
	{ value: "projects", name: "Projects" },
	{ value: "stratascratch", name: "Stratascratch" },
];

export const categoryOptions: Option[] = [
	{ value: "data-analyst", label: "Data Analyst" },
	{ value: "data-engineering", label: "Data Engineering" },
	{ value: "data-science", label: "Data Science" },
	{ value: "visualization", label: "Visualization" },
	{ value: "data-pipeline", label: "Data Pipeline" },
	{ value: "resources", label: "Resources" },
	{ value: "projects", label: "Projects" },
	{ value: "stratascratch", label: "Stratascratch" },
];

export const secondaryCategoryOptions: Option[] = [
	{ value: "business-analysis", label: "Business Analysis" },
	{ value: "data-exploration", label: "Data Exploration" },
	{ value: "data-pipeline", label: "Data Pipeline" },
	{ value: "data-modeling", label: "Data Modeling" },
	{ value: "regression", label: "Regression" },
	{ value: "classification", label: "Classification" },
	{ value: "clustering", label: "Clustering" },
	{ value: "nlp", label: "NLP" },
	{ value: "time-series", label: "Time Series" },
	{ value: "dashboarding", label: "Dashboarding" },
	{ value: "sql", label: "SQL" },
	{ value: "python", label: "Python" },
	{ value: "big-data", label: "Big Data" },
];

export const socials: SocialType[] = [
	{ icon: FaGithub, path: "https://github.com/ikidevz" },
	{
		icon: FaLinkedin,
		path: "https://www.linkedin.com/in/franz-monzales-671775135",
	},

	{ icon: FaXTwitter, path: "https://x.com/ikigamidevs" },
	{ icon: FaKaggle, path: "https://www.kaggle.com/franzmonzales" },
];

export const pageWithAuth: string[] = ["/login", "/register"];
export const pageWithoutAuth: string[] = [
	"/create/posts",
	"/edit/account",
	"/edit/posts",
];

export const questionCategoryChoice: Option[] = [
	{
		value: "all",
		label: "All",
	},
	{
		value: "business_intelligence",
		label: "Business Intelligence",
	},
	{
		value: "data",
		label: "Data Fundamentals",
	},
	{
		value: "data_governance",
		label: "Data Governance",
	},
	{
		value: "data_modeling",
		label: "Data Modeling",
	},
	{
		value: "deep_learning",
		label: "Deep Learning",
	},
	{
		value: "etl",
		label: "Extract, Transfer, Load",
	},
	{
		value: "feature_engineering",
		label: "Feature Engineering",
	},
	{
		value: "machine_learning",
		label: "Machine Learning",
	},
	{
		value: "pandas",
		label: "Pandas",
	},
	{
		value: "python",
		label: "Python",
	},
	{
		value: "statistics",
		label: "Statistics",
	},
	{
		value: "sql",
		label: "SQL",
	},
	{
		value: "stratascratch",
		label: "Stratascratch",
	},
	{
		value: "visualization",
		label: "Visualization",
	},
];
export const questionNumChoice: Option[] = [
	{
		value: "5",
		label: "5",
	},
	{
		value: "10",
		label: "10",
	},
	{
		value: "15",
		label: "15",
	},
	{
		value: "20",
		label: "20",
	},
	{
		value: "25",
		label: "25",
	},
];
