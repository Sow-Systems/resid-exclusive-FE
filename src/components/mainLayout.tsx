import { Footer } from "./footer";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

type MainLayoutProps = {
  children?: React.ReactNode;
};

export function MainLayout(props: MainLayoutProps): React.JSX.Element {
  const { children } = props;

  return (
    <div className="flex h-screen flex-grow overflow-y-auto">
      <Sidebar />
      <div className="flex-grow flex flex-col overflow-hidden pl-32">
        <Header />
        <div className="bg-bgGray flex-grow overflow-y-auto">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
