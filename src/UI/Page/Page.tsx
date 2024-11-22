import { PropsWithChildren } from "react";
import classes from "./Page.module.scss";

const Page = ({ children }: PropsWithChildren) => {
  return (
    <div id="page" className={classes.page}>
      <header
        data-testid="site-header"
        className={classes.header}
        role="banner"
      >
        Todos
      </header>
      <main data-testid="site-content" className={classes.content} role="main">
        <div className={classes.scrollContainer}>
          <div className={classes.contentContainer}>{children}</div>
        </div>
      </main>
      <footer
        data-testid="site-footer"
        className={classes.footer}
        role="contentinfo"
      >
        <p>Copyright &copy; 2024. The Best Company</p>
      </footer>
    </div>
  );
};
export default Page;

