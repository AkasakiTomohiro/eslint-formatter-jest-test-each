import fs from 'fs';
import path from 'path';

const join = (pathString: string) => path.join(__dirname, pathString);

export const describeSkipEach = {
  valid: [{
    filename: join('sample.spec.js'),
    code    : fs.readFileSync(join('sample.spec.js'), 'utf-8') 
  }],
  invalid: [{
    filename: join('sample-error1.spec.js'),
    code    : fs.readFileSync(join('sample-error1.spec.js'), 'utf-8'),
    errors  : [{
      messageId: 'UndefinedVariables'
    }]
  }]
};
