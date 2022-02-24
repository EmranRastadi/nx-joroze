import { v4 as uuidv4 } from 'uuid';

export const FORM_SECTIONS = [
  {
    label: 'Product Selection',
    questions: [{
      id: uuidv4(),
      type: 'panel',
      label: 'Select a product',
      questions: [
        {
          id: uuidv4(),
          name: 'product',
          type: 'choice',
          options: [
            'Breast pump, electric',
            'Breast pump, manual, any type',
            'Breast pump, hospital grade, electric',
          ],
          rules: {
            required: 'This is required',
          },
        },
      ],
    },
    {
      id: uuidv4(),
      type: 'panel',
      label: 'Specify a duraction',
      hint: 'The fields below will help us select the correct order form for you',
      questions: [
        {
          id: uuidv4(),
          label: 'Frequency of use',
          name: 'duration_frequency',
          type: 'select',
          options: [
            'Daily',
            'Nightly',
          ],
          rules: {
            required: 'This is required',
          },
          prerequisites: [
            ['product', 'Breast pump, electric'],
            ['product', 'Breast pump, manual, any type'],
          ],
        },
        {
          id: uuidv4(),
          label: 'Length of need (months)',
          name: 'duration_length',
          type: 'select',
          options: [
            '6',
            '12',
            '24',
          ],
          rules: {
            required: 'This is required',
          },
          prerequisites: [['product', 'Breast pump, electric']],
        },
      ],
      prerequisites: [
        ['product', 'Breast pump, electric'],
        ['product', 'Breast pump, manual, any type'],
      ],
    }],
  },
  {
    label: 'Clinical Info',
    questions: [{
      id: uuidv4(),
      type: 'panel',
      label: 'Patient characteristics',
      questions: [
        {
          id: uuidv4(),
          label: 'Weight',
          name: 'patient_weight',
          rules: {
            required: 'This is required',
            pattern: { value: /^[1-9]+$/i.source, message: 'Digits only' },
          },
          type: 'input',
        },
        {
          id: uuidv4(),
          label: 'Height',
          name: 'patient_height',
          type: 'input',
          rules: {
            required: 'This is required',
            pattern: { value: /^[1-9]+$/i.source, message: 'Digits only' },
          },
        },
      ],
    },
    {
      id: uuidv4(),
      type: 'panel',
      label: 'Clinical details',
      questions: [
        {
          id: uuidv4(),
          label: 'Infant due date',
          name: 'infant_due_date',
          type: 'input',
          rules: {
            required: 'This is required',
          },
        },
        {
          id: uuidv4(),
          label: 'Patient diagnosis',
          name: 'patient_diagnosis',
          type: 'choice',
          options: [
            'Pregnant mother',
            'Suppressed lactation',
            'Stuff 1',
            'Stuff 2',
            'Stuff 3',
            'Stuff 4',
            'Hello there',
          ],
          rules: {
            required: 'This is required',
          },
        },
      ],
      prerequisites: [
        ['product', 'Breast pump, hospital grade, electric'],
        ['duration_frequency', 'Daily'],
      ],
    }],
  },
];
