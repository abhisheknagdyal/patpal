import { useEffect, useState } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { CloudUpload, Paperclip } from 'lucide-react';

import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form.tsx';

import {
	FileInput,
	FileUploader,
	FileUploaderContent,
	FileUploaderItem,
} from '@/components/ui/fileUpload.tsx';
import Spinner from '@/components/spinner.tsx';

type FormFileInputProps = {
	label: string;
	desc: string | undefined;
	error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
	field: any;
	maxFiles?: number;
};

const FormFileInput = ({
	field,
	desc,
	label,
	error,
	maxFiles,
}: FormFileInputProps) => {
	const [files, setFiles] = useState<{ data: any; name: string }[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const dropZoneConfig = {
		maxFiles: maxFiles || 1,
		maxSize: 1024 * 1024 * 4,
		multiple: true,
	};

	useEffect(() => {
		field.onChange(files);
	}, [files]);

	return (
		<FormItem>
			<FormLabel>{label}</FormLabel>
			<FormControl>
				<FileUploader
					value={files}
					onValueChange={setFiles}
					setLoading={setLoading}
					dropzoneOptions={dropZoneConfig}
					className="relative bg-background rounded-lg p-2"
				>
					<FileInput
						id="fileInput"
						className="outline-dashed outline-1 outline-slate-500"
					>
						<div className="flex items-center justify-center flex-col p-8 w-full">
							{loading ? (
								<Spinner />
							) : (
								<>
									<CloudUpload className="text-gray-500 w-10 h-10" />
									<p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
										<span className="font-semibold">Click to upload</span> or
										drag and drop
									</p>
									<p className="text-xs text-gray-500 dark:text-gray-400">
										SVG, PNG, JPG, or GIF
									</p>
								</>
							)}
						</div>
					</FileInput>
					<FileUploaderContent>
						{files &&
							files.map((file, i) => (
								<FileUploaderItem key={i} index={i}>
									<Paperclip className="h-4 w-4 stroke-current" />
									<span className="inline-block max-w-[150px] truncate">
										{file.name}
									</span>
								</FileUploaderItem>
							))}
					</FileUploaderContent>
				</FileUploader>
			</FormControl>
			<FormDescription>{error ? <FormMessage /> : desc}</FormDescription>
		</FormItem>
	);
};

export default FormFileInput;
