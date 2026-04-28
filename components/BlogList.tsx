import { categories } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { roboto_mono } from "@/lib/font";
import BlogItem from "./BlogItem";
import { PostListDataInterface } from "@/lib/type";
import { Skeleton } from "./ui/skeleton";

const SkeletonList = () => (
	<>
		<li className='group'>
			<Skeleton className='w-full h-100' />
		</li>
		<li className='group'>
			<Skeleton className='w-full h-100' />
		</li>
		<li className='group'>
			<Skeleton className='w-full h-100' />
		</li>
	</>
);

const BlogList = ({ list, con }: PostListDataInterface) => {
	return (
		<Tabs
			defaultValue='all'
			className='flex flex-col items-center justify-center gap-6 my-10'>
			<TabsList className='gap-4 bg-transparent flex-col xl:flex-row mb-4'>
				{categories.map((item, i) => (
					<TabsTrigger
						key={i}
						value={item.value}
						className={`${roboto_mono.className} bg-white py-2 px-4 rounded-sm data-[state=active]:bg-black data-[state=active]:text-white`}>
						{item.name}
					</TabsTrigger>
				))}
			</TabsList>

			<TabsContent value='all' className='min-h-125'>
				<ul className='mt-7 card_grid'>
					{!list ? (
						<SkeletonList />
					) : (
						list.map((data, i) => <BlogItem info={data} key={i} />)
					)}
				</ul>
			</TabsContent>

			{categories
				.filter((c) => c.value !== "all")
				.map((cat) => (
					<TabsContent key={cat.value} value={cat.value} className='min-h-125'>
						<ul className='mt-7 card_grid'>
							{!list ? (
								<SkeletonList />
							) : (
								list.map((data, i) => {
									if (data.category.split(", ")[0] === cat.name)
										return <BlogItem info={data} key={i} />;
								})
							)}
						</ul>
					</TabsContent>
				))}
		</Tabs>
	);
};

export default BlogList;
