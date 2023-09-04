import ReactDOM from "react-dom/client";
import Router from "./Router";
import { GlobalStyle } from "./styles/globalStyle";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { RecoilRoot } from "recoil";
import { ToastContainer, toast } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-toastify/dist/ReactToastify.css";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query: any) => {
      if (query?.meta?.message) {
        toast.error(query?.meta?.message);
      }
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // window focus 설정
    },
  },
});
root.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastContainer
        position="bottom-center"
        limit={1}
        closeButton={false}
        autoClose={3000}
        hideProgressBar
      />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  </RecoilRoot>
);
