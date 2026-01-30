import { Routes, Route } from "react-router-dom";
import HomeEnhanced from "./pages/HomeEnhanced";
import ResultPage from "./pages/ResultPage";
import "./App.css";

const App = () => {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomeEnhanced />} />
				<Route path="/result" element={<ResultPage />} />
			</Routes>
		</div>
	);
};

export default App;
