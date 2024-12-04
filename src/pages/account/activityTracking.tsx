import { useMemo } from 'react';
import { TrendingUp } from 'lucide-react';
import {
	PieChart,
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Label,
	Pie,
	XAxis,
} from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
	{ month: 'January', weight: 186, height: 80 },
	{ month: 'February', weight: 305, height: 200 },
	{ month: 'March', weight: 237, height: 120 },
	{ month: 'April', weight: 73, height: 190 },
	{ month: 'May', weight: 209, height: 130 },
	{ month: 'June', weight: 214, height: 140 },
];

const chartConfig = {
	weight: {
		label: 'Weight',
		color: 'hsl(var(--chart-1))',
	},
	height: {
		label: 'Height',
		color: 'hsl(var(--chart-2))',
	},
} satisfies ChartConfig;

const pieChartData = [
	{ activity: 'rest', visitors: 275, fill: 'var(--color-rest)' },
	{ activity: 'sleep', visitors: 200, fill: 'var(--color-sleep)' },
	{ activity: 'walk', visitors: 287, fill: 'var(--color-walk)' },
	{ activity: 'run', visitors: 173, fill: 'var(--color-run)' },
	{ activity: 'other', visitors: 190, fill: 'var(--color-other)' },
];

const pieChartConfig = {
	timesBoarded: {
		label: 'Times Boarded',
	},
	rest: {
		label: 'Rest',
		color: 'hsl(var(--chart-1))',
	},
	sleep: {
		label: 'Sleep',
		color: 'hsl(var(--chart-2))',
	},
	walk: {
		label: 'Walk',
		color: 'hsl(var(--chart-3))',
	},
	run: {
		label: 'Run',
		color: 'hsl(var(--chart-4))',
	},
	other: {
		label: 'Other',
		color: 'hsl(var(--chart-5))',
	},
} satisfies ChartConfig;

const ActivityTracking = () => {
	const totalVisitors = useMemo(() => {
		return pieChartData.reduce((acc, curr) => acc + curr.visitors, 0);
	}, []);

	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="text-3xl font-semibold mb-8">Activity Tracking</h1>
			<div className="flex flex-col xl:flex-row items-center justify-center gap-5">
				<div className=" xl:w-[30vw]">
					<Card>
						<CardHeader>
							<CardTitle>BMI Tracker - Stacked</CardTitle>
							<CardDescription>
								Showing your pets BMI for the last 6 months
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ChartContainer config={chartConfig}>
								<AreaChart
									accessibilityLayer
									data={chartData}
									margin={{
										left: 12,
										right: 12,
									}}
								>
									<CartesianGrid vertical={false} />
									<XAxis
										dataKey="month"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										tickFormatter={(value) => value.slice(0, 3)}
									/>
									<ChartTooltip
										cursor={false}
										content={<ChartTooltipContent indicator="dot" />}
									/>
									<Area
										dataKey="height"
										type="natural"
										fill="var(--color-height)"
										fillOpacity={0.4}
										stroke="var(--color-height)"
										stackId="a"
									/>
									<Area
										dataKey="weight"
										type="natural"
										fill="var(--color-weight)"
										fillOpacity={0.4}
										stroke="var(--color-weight)"
										stackId="a"
									/>
								</AreaChart>
							</ChartContainer>
						</CardContent>
						<CardFooter>
							<div className="flex w-full items-start gap-2 text-sm">
								<div className="grid gap-2">
									<div className="flex items-center gap-2 font-medium leading-none">
										Tracking up by 7.2% this month{' '}
										<TrendingUp className="h-4 w-4" />
									</div>
									<div className="flex items-center gap-2 leading-none text-muted-foreground">
										January - June 2024
									</div>
								</div>
							</div>
						</CardFooter>
					</Card>
				</div>
				<div className="xl:w-[30vw] w-full">
					<Card className="flex flex-col">
						<CardHeader className="items-center">
							<CardTitle>Activity Tracking - While boarded</CardTitle>
							<CardDescription>January - June 2024</CardDescription>
						</CardHeader>
						<CardContent className="h-full">
							<ChartContainer
								config={pieChartConfig}
								className="mx-auto aspect-square md:h-[260px]"
							>
								<PieChart>
									<ChartTooltip
										cursor={false}
										content={<ChartTooltipContent hideLabel />}
									/>
									<Pie
										data={pieChartData}
										dataKey="visitors"
										nameKey="activity"
										innerRadius={60}
										strokeWidth={5}
									>
										<Label
											content={({ viewBox }) => {
												if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
													return (
														<text
															x={viewBox.cx}
															y={viewBox.cy}
															textAnchor="middle"
															dominantBaseline="middle"
														>
															<tspan
																x={viewBox.cx}
																y={viewBox.cy}
																className="fill-foreground text-3xl font-bold"
															>
																{totalVisitors.toLocaleString()}
															</tspan>
															<tspan
																x={viewBox.cx}
																y={(viewBox.cy || 0) + 24}
																className="fill-muted-foreground"
															>
																Times Boarded
															</tspan>
														</text>
													);
												}
											}}
										/>
									</Pie>
								</PieChart>
							</ChartContainer>
						</CardContent>
						<CardFooter className="flex-col gap-2 text-sm">
							<div className="flex items-center gap-2 font-medium leading-none">
								Tracking up by 14.2% this month{' '}
								<TrendingUp className="h-4 w-4" />
							</div>
							<div className="leading-none text-muted-foreground">
								Showing total activity stats for the last 6 months
							</div>
						</CardFooter>
					</Card>
				</div>
				<div className="xl:w-[30vw]">
					<Card>
						<CardHeader>
							<CardTitle>Exercise Rate - Multiple</CardTitle>
							<CardDescription>January - June 2024</CardDescription>
						</CardHeader>
						<CardContent>
							<ChartContainer config={chartConfig}>
								<BarChart accessibilityLayer data={chartData}>
									<CartesianGrid vertical={false} />
									<XAxis
										dataKey="month"
										tickLine={false}
										tickMargin={10}
										axisLine={false}
										tickFormatter={(value) => value.slice(0, 3)}
									/>
									<ChartTooltip
										cursor={false}
										content={<ChartTooltipContent indicator="dashed" />}
									/>
									<Bar dataKey="weight" fill="var(--color-weight)" radius={4} />
									<Bar dataKey="height" fill="var(--color-height)" radius={4} />
								</BarChart>
							</ChartContainer>
						</CardContent>
						<CardFooter className="flex-col items-start gap-2 text-sm">
							<div className="flex gap-2 font-medium leading-none">
								Tracking up by 9.3% this month{' '}
								<TrendingUp className="h-4 w-4" />
							</div>
							<div className="leading-none text-muted-foreground">
								Showing total exercise stats for the last 6 months
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default ActivityTracking;
