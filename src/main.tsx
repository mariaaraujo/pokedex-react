import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import Router from './router';


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <Router />
    </BrowserRouter>
)
