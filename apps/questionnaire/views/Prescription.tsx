import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import {
  Button,
  VStack,
  StackDivider,
  Progress,
  Spinner,
  Heading,
  Code,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import Question from '../components/Question/Question';
import styles from './Prescription.module.scss';

export default function Prescription() {
  const { handleSubmit, register, control, formState, getValues } = useForm();

  const { errors, isSubmitting } = formState;
  const progressBarContainerColor = useColorModeValue('white', undefined);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submittedValues, setSubmittedValues] = useState();
  const [formSections, setFormSections] = useState([]);
  const currentFormSection = formSections[pageNumber];
  const isLastPage = pageNumber === formSections.length - 1;
  const { label: formLabel, questions = [] } = currentFormSection || {};

  useEffect(() => {
    async function fetchData() {
      const data = await fetch('/api/form').then((response) => response.json());

      setFormSections(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  const handleNextPage = () => setPageNumber(pageNumber + 1);

  async function onSubmit(values) {
    if (!isLastPage) {
      handleNextPage();
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmittedValues(values);
    setIsSubmitted(true);
  }

  return (
    <div
      className={classNames(styles.container, {
        [styles.container_loading]: loading,
      })}
    >
      {loading && <Spinner size="xl" />}
      {isSubmitted && (
        <div>
          <VStack>
            <div>Order Submitted!</div>{' '}
            <Code colorScheme="teal" variant="outline">
              <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
            </Code>
          </VStack>
        </div>
      )}
      {!loading && !isSubmitted && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={styles.progress_bar} bg={progressBarContainerColor}>
            <div className={styles.progress_bar_content}>
              You are submitting an order for <strong>Some Clinic</strong>
            </div>
            <Progress
              value={(pageNumber + 1 / formSections.length) * 100}
              size="xs"
              colorScheme="teal"
            />
          </Box>
          <VStack
            align="stretch"
            divider={<StackDivider borderColor="gray.200" />}
            spacing="4"
          >
            <Heading size="lg">
              {pageNumber + 1}. {formLabel}
            </Heading>
            {questions.map((question) => (
              <Question
                key={question.id}
                question={question}
                control={control}
                register={register}
                errors={errors}
                getValues={getValues}
              />
            ))}
            <Button isLoading={isSubmitting} colorScheme="teal" type="submit">
              {isLastPage ? 'Submit Order' : 'Continue'}
            </Button>
          </VStack>
        </form>
      )}
    </div>
  );
}
