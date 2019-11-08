import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { format } from 'url';
import CurrentElement from '../../styled-components/CurrentElement';
import { useInterval } from '../../effects/interval.hook';

const arrSnippet = `
[
    {
        id: 1,
        name: 'blake',
        age: 25
    },
    {
        id: 2,
        name: 'byron',
        age: 27
    }
]
`;

export default function ForEachVisualizer() {
  const [inputArr, setInputArr] = useState<any[]>([8, 2, 4, 2, 8]);
  const [inputCB, setInputCB] = useState<any>({ fun: (ele: any) => 5 });
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentIteration, setCurrentIteration] = useState(-1);

  useInterval(() => {
    if (isPlaying && currentIteration < inputArr.length - 1) {
      setCurrentIteration(currentIteration + 1);
    }
  }, 2500)

  function updateInputArr(event: React.ChangeEvent<HTMLTextAreaElement>) {
    console.log(event.target.value)
    try {
      // eslint-disable-next-line
      const arr: any = eval(event.target.value);
      if (Array.isArray(arr)) {
        setInputArr(arr);
      } else {
        throw new Error('Invalid Input');
      }

    } catch {
      setInputArr(['Invalid Input'])
    }
  }

  function updateInputCallback(event: React.ChangeEvent<HTMLTextAreaElement>) {
    console.log(inputCB)
    console.log(event.target.value)
    try {
      // eslint-disable-next-line
      const fun: any = eval(event.target.value);
      console.log(`typeof fun: ${typeof (fun)}`)
      if (typeof (fun) === 'function') {
        console.log('setting input cb')
        setInputCB({ fun });
      } else {
        throw new Error('Invalid Input');
      }

    } catch {
      setInputCB({ fun: (ele: any) => 'invalid cb provided' })
    }
  }

  function formatArrayForDisplay(arr: any[]) {
    return <>
      {
        [...arr.reduce((acc, cur, index) => {
          if (typeof (cur) === 'object') {

            return [...acc, index !== 0 ? ', ' : '', index === currentIteration ? <CurrentElement>{JSON.stringify(cur)}</CurrentElement>: JSON.stringify(cur)];
          } else {
            return [...acc, index !== 0 ? ', ' : '', index === currentIteration ? <CurrentElement>{cur}</CurrentElement>: cur];
          }
        }, ['[']), ']']
      }
    </>
  }

  return (
    <Container>
      <Row>
        <Col>
          <p>
            Enter JavaScript array:
        </p>
          <textarea onChange={updateInputArr} defaultValue="[8, 2, 4, 2, 8]" cols={30} rows={10}></textarea>
        </Col>
        <Col>
          <p>
            Enter the .reduce callback function:
        </p>

          <textarea onChange={updateInputCallback} defaultValue="(ele) => { return 5; }" cols={30} rows={10}></textarea>
        </Col>

      </Row>
      <hr />
      <Row>
        <Col>
          Array: {formatArrayForDisplay(inputArr)}.reduce({inputCB.fun.toString()})
        </Col>
        <Col>
          {/* {inputCB.toString()} */}
        </Col>
      </Row>
      <Row>
        <Col>
          <p>index: {currentIteration === -1 ? 'not started' : currentIteration}</p>
          <p>value: {inputArr[currentIteration]}</p>
          <p>
            OutputArr to this point: {
              formatArrayForDisplay(
                inputArr.filter((ele, index) => index <= currentIteration)
                  .map(inputCB.fun)
              )
            }
          </p>
          <button className="btn btn-success"
            onClick={() => setCurrentIteration(currentIteration - 1)}
            disabled={currentIteration < 0}>
            Previous
          </button>
          <button className="btn btn-success"
            onClick={() => setCurrentIteration(currentIteration + 1)}
            disabled={currentIteration >= inputArr.length - 1}>Next
            </button>
          <button className="btn btn-success" onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Pause' : 'Play'}</button>
          <button className="btn btn-success" onClick={() => setCurrentIteration(-1)}>Reset</button>
        </Col>

      </Row>
    </Container>
  )
}
