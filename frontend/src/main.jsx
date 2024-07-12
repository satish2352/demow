import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider as WebTheme } from "./context/ThemeContext.jsx";
import { SidebarProvider } from "./context/SidebarContext.jsx";
import { TitleData } from "./context/TitleContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { ShowStatus } from "./context/ShowContext.jsx";
import { SearchExportProvider } from "./context/SearchExportContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TitleData>
      <WebTheme>
        <SidebarProvider>
        <SearchExportProvider>
            <ShowStatus>
              <App />
            </ShowStatus>
            </SearchExportProvider>
        </SidebarProvider>
      </WebTheme>
    </TitleData>
  </BrowserRouter>
);
