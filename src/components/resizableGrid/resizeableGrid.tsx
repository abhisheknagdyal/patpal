import { type ReactNode, memo } from 'react';
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable.tsx';

type Props = {
	panelOneElement: ReactNode;
	panelTwoElement: ReactNode;
	panelThreeElement: ReactNode;
	panelFourElement: ReactNode;
};

const ResizeableGrid = ({
	panelOneElement,
	panelTwoElement,
	panelThreeElement,
	panelFourElement,
}: Props) => {
	return (
		<ResizablePanelGroup
			direction="horizontal"
			className="rounded-lg border w-full"
		>
			<ResizablePanel defaultSize={50} minSize={40}>
				<ResizablePanelGroup direction="vertical">
					<ResizablePanel defaultSize={50} minSize={30}>
						<div className="h-full flex flex-col">
							<div className="w-full items-center justify-center p-6 overflow-auto">
								{panelOneElement}
							</div>
						</div>
					</ResizablePanel>
					<ResizableHandle />
					<ResizablePanel defaultSize={50} minSize={30}>
						<div className="h-full flex flex-col">
							<div className="w-full items-center justify-center p-6 overflow-auto">
								{panelTwoElement}
							</div>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel defaultSize={50} minSize={40}>
				<ResizablePanelGroup direction="vertical">
					<ResizablePanel defaultSize={50} minSize={30}>
						<div className="h-full flex flex-col">
							<div className="w-full items-center justify-center p-6 overflow-auto">
								{panelThreeElement}
							</div>
						</div>
					</ResizablePanel>
					<ResizableHandle />
					<ResizablePanel defaultSize={50} minSize={30}>
						<div className="h-full flex flex-col">
							<div className="w-full items-center justify-center p-6 overflow-auto">
								{panelFourElement}
							</div>
						</div>
					</ResizablePanel>
				</ResizablePanelGroup>
			</ResizablePanel>
		</ResizablePanelGroup>
	);
};

export default memo(ResizeableGrid);
