'use client';
import { useForm } from "react-hook-form";
import { TransactionType } from "@/app/_libs/enums";
import { mockOpponents } from "@/app/_libs/placeholder-data";

type CreateModalProps = {
	onClose: () => void;
};

type FormData = {
	name: string;
	opponent_id: number;
	is_settled: boolean;
	type: TransactionType;
	amount: number;
	memo: string;
};

const CreateModalComponent = (props: CreateModalProps) => {
	const { onClose } = props;

	const {
    register,
    handleSubmit,
    formState: { errors }
	} = useForm<FormData>();

	const onSubmit = (data: any) => {
		console.log(data);
	}

	const opponents = mockOpponents;

	return (
		<div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
			<div className="bg-white w-11/12 max-w-6xl h-5/6 overflow-auto rounded shadow-lg p-6 relative">
				<button
					onClick={onClose}
					className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
				>
					✖
				</button>
				<h2 className="text-lg font-bold mb-4">作成</h2>
				<form onSubmit={handleSubmit(onSubmit)}>

					{/* Name field */}
					<div className="mb-4">
						<label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
							項目名
						</label>
						<input
							id="name"
							type="text"
							className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							placeholder="項目名"
							{...register("name", { required: '項目名は必須です' })} 
						/>
						<span>
							{errors.name && errors.name.message}
						</span>
					</div>

					{/* Opponent field */}
					<div className="mb-4">
						<label htmlFor="opponent" className="block text-gray-700 text-sm font-bold mb-2">
							相手
						</label>
						<select
							id="opponent"
							className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							{...register("opponent_id", { required: '相手の選択は必須です' })}
						>
							{
								opponents?.map((opponent) => (
									<option key={opponent.id} value={opponent.id}>{opponent.name}</option>
								))
							}
						</select>
						<span>{errors.opponent_id && errors.opponent_id.message}</span>
					</div>

					{/* Is_settled field */}
					<div className="mb-4">
						<label htmlFor="is_settled" className="block text-gray-700 text-sm font-bold mb-2">
							清算ステータス
						</label>
						<select
							id="is_settled"
							className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							{...register("is_settled", { required: '清算ステータスの選択は必須です' })} 
						>
							<option value="0">未清算</option>
							<option value="1">清算済み</option>
						</select>
						<span>{errors.is_settled && errors.is_settled.message}</span>
					</div>

					{/* Type field */}
					<div className="mb-4">
						<label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
							タイプ
						</label>
						<select
							id="type"
							className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							{...register("type", { required: 'タイプの選択は必須です' })} 
						>
							<option value={TransactionType.Lend}>貸し</option>
							<option value={TransactionType.Borrow}>借り</option>
						</select>
						<span>{errors.amount && errors.amount.message}</span>
					</div>

					{/* Amount field */}
					<div className="mb-4">
						<label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
							金額
						</label>
						<input
							id="amount"
							type="number"
							className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							placeholder="1000"
							{...register("amount", { required: '金額の設定は必須です', valueAsNumber: true })} 
						/>
						<span>{errors.amount && errors.amount.message}</span>
					</div>

					{/* Memo field */}
					<div className="mb-4">
						<label htmlFor="memo" className="block text-gray-700 text-sm font-bold mb-2">
							メモ
						</label>
						<input
							id="memo"
							type="text"
							className="mt-1 block w-full p-2 border border-gray-300 bg-white rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							placeholder="メモ"
							{...register("memo")} 
						/>
					</div>

					<div className="flex justify-center mt-4">
						<button onClick={onClose} className="px-4 py-2 mr-2 bg-gray-300 rounded shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors">キャンセル</button>
						<button type="submit" className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 transition-colors">作成する</button>
					</div>
				</form>
			</div>
		</div>
	)
};

export default CreateModalComponent;