import { Checkbox, Col, Collapse, Input, List, message, Row } from 'antd';
import * as React from 'react';
import { ItodoItem, ItodoState } from '../interfaces/index';
import { createNowDateString, isInArray, removeItems } from '../utils/index';
const { Search } = Input;
const { Panel } = Collapse;
import './TodoList.css';

class TodoList extends React.Component {
  public state: ItodoState = {
    todoList: [],
    doingList: [],
    doneList: [],
    selectedTodoList: [],
  };

  constructor(defaultProps) {
    super(defaultProps);
    this.addTodo = this.addTodo.bind(this);
    this.changetodoList = this.changetodoList.bind(this);
  }
  public addTodo(item: string): void {
    if (item.length === 0) {
      return;
    }
    if (isInArray(this.state.todoList, item)) {
      message.error('该任务已存在');
    } else {
      const todoItem: ItodoItem = {
        title: item, createDate: new Date(),
      };
      this.setState({
        todoList: [...this.state.todoList, todoItem],
        selectedTodoList: [],
      });
    }
  }
  public changetodoList(checkedArray: string[]) {
    const checkedTodoItem = this.state.todoList.filter((item) => {
      return item.title === checkedArray[0];
    });
    this.setState({
      doingList: checkedTodoItem.concat([...this.state.doingList]),
      todoList: removeItems(this.state.todoList, checkedArray),
    });
  }
  public changedoingList(checkedArray: string[]): void {
    // tslint:disable-next-line:no-console
    console.warn(checkedArray);
    const checkedDoingItem = this.state.doingList.filter((item) => {
      return item.text === checkedArray[0];
    });
    this.setState({
      doneList: checkedDoingItem.concat([...this.state.doneList]),
      todoList: removeItems(this.state.doingList, checkedArray),
    });
  }
  public render() {
    return (
      <Row gutter={8}>
        <Col span={24} className="search-col">
          <Search placeholder="输入待办事项" enterButton="添加" onSearch={this.addTodo} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Collapse defaultActiveKey={['1']} className="todo">
            <Panel header="todo" key="1">
              <Checkbox.Group onChange={this.changetodoList} value={this.state.selectedTodoList}>
                <List
                  dataSource={this.state.todoList}
                  renderItem={
                    (item) => (<List.Item><Checkbox value={item.text}>{item.text}</Checkbox></List.Item>)
                  }
                />
              </Checkbox.Group>
            </Panel>
          </Collapse>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Collapse defaultActiveKey={['1']} className="doing">
            <Panel header="doing" key="1">
              <Checkbox.Group onChange={this.changedoingList}>
                <List
                  dataSource={this.state.doingList}
                  renderItem={
                    (item) => (<List.Item>
                      <Checkbox value={item.text}>
                        {item.text}
                      </Checkbox>
                      </List.Item>)
                  }
                />
              </Checkbox.Group>
            </Panel>
          </Collapse>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Collapse defaultActiveKey={['1']} className="done">
            <Panel header="done" key="1">
              <List
                dataSource={this.state.doneList}
                renderItem={(item) => (<List.Item>{item}</List.Item>)}
              />
            </Panel>
          </Collapse>
        </Col>
      </Row>
    );
  }
}

export default TodoList;
