import { PropsWithChildren } from 'react';
import classes from './Page.module.scss';

const Page = ({ children }: PropsWithChildren) => {
  return (
	<div id="page" className={classes.page}>
		<header data-testid="site-header" className={classes.header} role="banner" >header</header>
		<main data-testid="site-content" className={classes.content} role="main">
			<div className={classes.scrollContainer}>
				<div className={classes.contentContainer}>
					{children}
				</div>
			</div>
		</main>
		<footer data-testid="site-footer" className={classes.footer} role="contentinfo" >footer</footer>
	</div>
  );
}
export default Page;