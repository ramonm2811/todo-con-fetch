import React, { useEffect, useState } from "react";

//create your first component
const Home = props => {
	const [tasks, setTasks] = useState([]);
	const url = "https://assets.breatheco.de/apis/fake/todos/user/ramonm2811";

	const Enter = e => {
		if (e.key === "Enter" && e.target.value !== "") {
			tasks.push({ label: e.target.value, done: false });
			setTasks([...tasks]);
			tasks.length == 1 ? createUser() : updateTask();
			e.target.value = "";
		}
	};

	useEffect(() => {
		getTasks();
	}, []);
	const getTasks = () => {
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (Array.isArray(data)) {
					setTasks(data);
				}
			})
			.catch(error => {
				console.log(error);
			});
	};

	const createUser = () => {
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(tasks)
		})
			.then(response => response.json())
			.then(data => {
				updateTask();
			})
			.catch(error => console.log(error));
	};

	const updateTask = () => {
		fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(tasks)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
			})
			.catch(error => console.log(error));
	};

	const deleteTasks = () => {
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => {})
			.catch(error => console.log(error));
	};

	return (
		<div className="container-fluid bg-dark vh-100">
			<div className="titulo container bg-secondary rounded w-50 vh-100">
				<h1 className="text-white">to dos Fetch</h1>
				<div className="container d-flex justify-content-center text-align-center">
					<div>
						<div className="input-group mb-3">
							<input
								className="input1 rounded"
								placeholder=""
								onKeyUp={e => Enter(e)}
							/>
							<div className="input-group-append">
								<button
									className="btn btn-danger"
									onClick={() => {
										setTasks([]);
										deleteTasks();
									}}>
									Borrar tareas
								</button>
							</div>
						</div>

						<ul>
							{tasks.length === 0 ? (
								<li className="tareas notask rounded bg-warning border border-warning fs-5 text-white p-2">
									Agregue to do.
								</li>
							) : (
								tasks.map((t, index) => {
									return (
										<div key={index}>
											<li className="tareas rounded bg-dark border border-light text-white">
												<p className="rounded bg-dark border border-dark text-white">
													{t.label}
												</p>
												<button
													className="boton"
													onClick={() => {
														tasks.splice(index, 1);
														setTasks([...tasks]);
														console.log(
															tasks.length
														);
														tasks.length === 0
															? deleteTasks()
															: updateTask();
													}}>
													<i className="fas fa-times text-white"></i>
												</button>
											</li>
										</div>
									);
								})
							)}
							{tasks.length > 0 ? (
								<li className="contadordetareas rounded bg-warning border border-warning fs-5 text-white p-2 my-2">
									{tasks.length > 1
										? `${tasks.length} items left`
										: `${tasks.length} item left`}
								</li>
							) : (
								""
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
