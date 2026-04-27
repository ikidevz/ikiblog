import { CategoryData, SocialType } from "./type";

import { FaXTwitter } from "react-icons/fa6";
import { FaGithub, FaKaggle, FaLinkedin } from "react-icons/fa";
import { Option } from "@/components/ui/multiple-selector";

export const category: CategoryData[] = [
	{
		value: "all",
		name: "All",
	},
	{
		value: "data-analysis",
		name: "Data Analysis",
	},
	{
		value: "machine-learning",
		name: "Machine Learning",
	},
	{
		value: "visualizaiton",
		name: "Visualization",
	},
	{
		value: "techniques",
		name: "Techniques",
	},
	{
		value: "resource",
		name: "Resource",
	},
	{
		value: "stratascratch",
		name: "Stratascratch",
	},
];

export const socials: SocialType[] = [
	{ icon: FaGithub, path: "https://github.com/ikigamisama" },
	{
		icon: FaLinkedin,
		path: "https://www.linkedin.com/in/franz-monzales-671775135",
	},

	{ icon: FaXTwitter, path: "https://x.com/ikigamidevs" },
	{ icon: FaKaggle, path: "https://www.kaggle.com/franzmonzales" },
];

export const categoryOption: Option[] = [
	{
		value: "Data Analysis",
		label: "Data Analysis",
	},
	{
		value: "Machine Learning",
		label: "Machine Learning",
	},
	{
		value: "Visualization",
		label: "Visualization",
	},
	{
		value: "Techniques",
		label: "Techniques",
	},
	{
		value: "Resource",
		label: "Resource",
	},
	{
		value: "Project",
		label: "Project",
	},
	{
		value: "Highlight",
		label: "Highlight",
	},
	{
		value: "Stratascratch",
		label: "Stratascratch",
	},
];

export const secondaryCategoryOptions: Option[] = [
	{ value: "business-analysis", label: "Business Analysis" },
	{ value: "data-exploration", label: "Data Exploration" },
	{ value: "data-engineering", label: "Data Engineering" },
	{ value: "regression", label: "Regression" },
	{ value: "classification", label: "Classification" },
	{ value: "nlp", label: "NLP" },
	{ value: "clustering", label: "Clustering" },
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
