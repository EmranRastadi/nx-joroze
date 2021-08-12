import styles from './index.module.scss';
import {
  Card,
  Box,
  Alert,
  AlertTitle,
  AlertDescription,
  CloseButton,
  AlertIcon,
} from '@nx-joroze/ui';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className={styles.page}>
      <div>
        <Card>
          <Alert status="success">
            <AlertIcon />
            <AlertTitle mr={2}>Hello</AlertTitle>
            <AlertDescription>This is a test</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" />
          </Alert>
          Hi
        </Card>
      </div>
    </div>
  );
}

export default Index;
