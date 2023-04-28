import fs from 'fs';
import path from 'path';

const join = (pathString: string) => path.join(__dirname, pathString);

export const testOnlyEach = {
  valid: [
    {
      filename: join('sample.spec.js'),
      code    : fs.readFileSync(join('sample.spec.js'), 'utf-8'),
      options : [{
        indent: 2
      }]  
    },
    {
      filename: join('sample2.spec.js'),
      code    : fs.readFileSync(join('sample2.spec.js'), 'utf-8'),
      options : [{
        indent: 2
      }]  
    }
  ],
  invalid: [
    {
      filename: join('sample-error1.spec.js'),
      code    : fs.readFileSync(join('sample-error1.spec.js'), 'utf-8'),
      errors  : [{
        messageId: 'TestEachArgumentMismatch'
      }],
      options: [{
        indent: 2
      }]
    },
    {
      filename: join('sample-error2.spec.js'),
      code    : fs.readFileSync(join('sample-error2.spec.js'), 'utf-8'),
      errors  : [{
        messageId: 'TestEachArgumentMismatch'
      }],
      options: [{
        indent: 2
      }]
    },
    {
      filename: join('sample-error3.spec.js'),
      code    : fs.readFileSync(join('sample-error3.spec.js'), 'utf-8'),
      errors  : [{
        messageId: 'TestEachArgumentWidthMismatch'
      }],
      output : fs.readFileSync(join('sample.spec.js'), 'utf-8'),
      options: [{
        indent: 2
      }]
    },
    {
      filename: join('sample-error4.spec.js'),
      code    : fs.readFileSync(join('sample-error4.spec.js'), 'utf-8'),
      errors  : [{
        messageId: 'TestEachArgumentWidthMismatch'
      }],
      output : fs.readFileSync(join('sample.spec.js'), 'utf-8'),
      options: [{
        indent: 2
      }]
    },
    {
      filename: join('sample-error5.spec.js'),
      code    : fs.readFileSync(join('sample-error5.spec.js'), 'utf-8'),
      errors  : [{
        messageId: 'TestEachArgumentWidthMismatch'
      }],
      output : fs.readFileSync(join('sample.spec.js'), 'utf-8'),
      options: [{
        indent: 2
      }]
    }
  ]
};
