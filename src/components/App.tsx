import { Button, Checkbox, Col, Collapse, Icon, Input, Layout, List, Row } from 'antd';
import * as React from 'react';
import './App.css';
const { Search } = Input;
const { Panel } = Collapse;
const { Header, Content, Footer } = Layout;
import TodoList from './TodoList';

class App extends React.Component {
  public gotoGithub() {
    location.href = 'https://github.com/yhlben/notepad';
  }
  public render() {
    return (<div>
      <Layout className="main">
        <Row className="header">
          <Col
          xs={{ span: 22, offset: 1 }}
          sm={{ span: 22, offset: 1 }}
          md={{ span: 22, offset: 1 }}
          lg={{ span: 20, offset: 2 }}
          xl={{ span: 20, offset: 2 }}>
          记事本
          <div className="logo">
            <Icon type="github" onClick={this.gotoGithub} />
          </div>
          </Col>
        </Row>
        <Content className="container">
          <TodoList></TodoList>
        </Content>
        <Footer className="footer">
          Created by <a target="_blank" href="https://github.com/yhlben">yhlben</a> ©2018
        </Footer>
      </Layout>

    </div>);
  }
}

export default App;
