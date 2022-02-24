import { useMemo } from 'react';
import { useWatch, Controller } from 'react-hook-form';
import {
  Radio,
  RadioGroup,
  Stack,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Select,
  Heading,
} from '@chakra-ui/react';

export default function Question(props) {
  const { question, control, register, errors, getValues } = props;
  const { name, type, label, hint, options, prerequisites, rules, questions } =
    question;

  const transformedRules = useMemo(() => {
    if (rules && 'pattern' in rules) {
      return {
        ...rules,
        pattern: {
          ...rules.pattern,
          value: new RegExp(rules?.pattern?.value),
        },
      };
    }

    return rules;
  }, [rules]);

  const fieldsToWatch = useMemo(
    () =>
      prerequisites
        ? [...new Set(prerequisites.map(([fieldName]) => fieldName))]
        : undefined,
    [prerequisites]
  );

  useWatch({
    control,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    name: fieldsToWatch,
    defaultValue: '',
  });

  const visible = prerequisites
    ? prerequisites.some(
        ([fieldName, expectedValue]) => getValues(fieldName) === expectedValue
      )
    : true;

  if (!visible) {
    return null;
  }

  switch (type) {
    case 'panel':
      return (
        <>
          <Heading size="sm">{label}</Heading>
          {hint && <div>{hint}</div>}
          {questions.map((pQuestion) => (
            <Question key={pQuestion.id} {...props} question={pQuestion} />
          ))}
        </>
      );
    case 'select':
      return (
        <FormControl isInvalid={errors[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Select
            id={name}
            placeholder="Select option"
            {...register(name, transformedRules)}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors[name] && errors[name].message}
          </FormErrorMessage>
        </FormControl>
      );
    case 'choice':
      return (
        <FormControl isInvalid={errors[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Controller
            name={name}
            control={control}
            rules={transformedRules}
            render={({ field }) => (
              <RadioGroup {...field}>
                <Stack direction="column">
                  {options.map((option, index) => (
                    <Radio key={index} colorScheme="green" value={option}>
                      {option}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            )}
          />
          <FormErrorMessage>
            {errors[name] && errors[name].message}
          </FormErrorMessage>
        </FormControl>
      );
    case 'input':
      return (
        <FormControl isInvalid={errors[name]}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Input id={name} {...register(name, transformedRules)} />
          <FormErrorMessage>
            {errors[name] && errors[name].message}
          </FormErrorMessage>
        </FormControl>
      );
    default:
      return null;
  }
}
