import "./index.css";
import { FaPlus } from "react-icons/fa";
import {
	MdRadioButtonUnchecked,
	MdOutlineRadioButtonChecked,
} from "react-icons/md";
import { PiTrashBold } from "react-icons/pi";
import { useState, useEffect } from "react";

function TodoItem({ text, isChecked, toggleCheck, onDelete }) {
	return (
		<li className="flex justify-between items-center pb-3 pt-1 border-b-2 last:border-b-0">
			{isChecked ? (
				<MdOutlineRadioButtonChecked
					onClick={toggleCheck}
					className="text-2xl cursor-pointer text-green-600"
				/>
			) : (
				<MdRadioButtonUnchecked
					onClick={toggleCheck}
					className="text-2xl cursor-pointer text-gray-500"
				/>
			)}
			<span
				className={`text-xl max-w-[calc(100%-80px)] break-words ${
					isChecked ? "line-through text-gray-400 italic" : ""
				}`}
			>
				{text}
			</span>
			<PiTrashBold
				onClick={onDelete}
				className="text-xl text-red-500 cursor-pointer hover:text-red-700 transition"
			/>
		</li>
	);
}

function App() {
	// Initialisation des tâches à partir du localStorage (fonction passée à useState)
	const [tasks, setTasks] = useState(() => {
		const savedTasks = localStorage.getItem("tasks");
		return savedTasks ? JSON.parse(savedTasks) : [];
	});

	const [inputContent, setInputContent] = useState("");

	// Synchroniser localStorage à chaque modification de tasks
	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	// Fonction pour supprimer une tâche par son index
	const deleteTask = (indexToDelete) => {
		setTasks(tasks.filter((_, index) => index !== indexToDelete));
	};

	const toggleCheck = (index) => {
		setTasks(
			tasks.map((task, i) =>
				i === index ? { ...task, isChecked: !task.isChecked } : task
			)
		);
	};

	const addTask = () => {
		if (inputContent.trim() !== "") {
			setTasks([{ text: inputContent, isChecked: false }, ...tasks]);
			setInputContent("");
		}
	};

	const placeholderExamples = [
		"ex : Boycotter israel",
		"ex : Acheter des brocolis",
		"ex : Faire quelque chose",
		"ex : Faire une Lasagne",
		"ex : Faire 50 pompe avant de dormir",
		"ex : Faire des courses raisonnable",
		"ex : Porter plainte sans raison",
		"ex : Laver sa tesla",
		"ex : Bruler un feu vert",
	];

	const [placeholder, setPlaceholder] = useState("");

	useEffect(() => {
		const getRandomPlaceholder = (exclude) => {
			let newPlaceholder;
			do {
				newPlaceholder =
					placeholderExamples[
						Math.floor(Math.random() * placeholderExamples.length)
					];
			} while (newPlaceholder === exclude);
			return newPlaceholder;
		};

		setPlaceholder(getRandomPlaceholder(""));
	}, []);

	return (
		<div className="h-screen flex justify-center items-center p-2">
			<div className="w-full max-w-md bg-white border-2 rounded-2xl p-6 md:p-9 shadow-3xl">
				<h1 className="text-center text-2xl font-bold">To-do-list</h1>
				<div className="flex justify-center w-full mt-5 mb-5">
					<input
						value={inputContent}
						onChange={(e) => setInputContent(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								addTask(); // Appelle la fonction d'ajout de tâche
							}
						}}
						placeholder={placeholder}
						className="border-2 half-rounded-left w-5/6 p-2 pl-4"
						type="text"
					/>
					<button
						onClick={addTask}
						className="flex justify-center items-center border-2 border-black p-1.5 half-rounded-right w-1/6 cursor-pointer bg-fraise text-white hover:bg-amber-600 active:scale-95 active:bg-citron transition duration-300 ease-in-out"
					>
						<FaPlus />
					</button>
				</div>
				<ul className="space-y-2 max-h-[30vh] overflow-y-auto">
					{tasks.map((task, index) => (
						<TodoItem
							key={index}
							text={task.text}
							isChecked={task.isChecked}
							toggleCheck={() => toggleCheck(index)}
							onDelete={() => deleteTask(index)}
						/>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
