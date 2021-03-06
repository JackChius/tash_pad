import { Button, Modal } from 'antd';
import * as localforage from 'localforage';
import * as React from 'react';
import { AppContext } from '../context/index';
import './SettingPanel.css';
const { confirm } = Modal;

interface ISettingPanel {
  showPanel: boolean;
  todolistRef: any;
  dataTableRef: any;
  changeSettingPanel: () => void;
}

class SettingPanel extends React.Component<ISettingPanel> {
  constructor(props) {
    super(props);
    this.clearData = this.clearData.bind(this);
    this.confirmClear = this.confirmClear.bind(this);
    this.downloadData = this.downloadData.bind(this);
    this.switchVisable = this.switchVisable.bind(this);
  }
  public clearData(event): void {
    event.preventDefault();
    confirm({
      title: '确认清空数据？',
      content: '清空后无法恢复',
      cancelText: '取消',
      okText: '确认',
      onOk: this.confirmClear,
    });
    this.props.changeSettingPanel();
  }
  public confirmClear(): void {
    if (this.props.todolistRef && this.props.todolistRef.setState) {
      this.props.todolistRef.setState({
        todoList: [],
        doingList: [],
        doneList: [],
      });
    }
    if (this.props.dataTableRef && this.props.dataTableRef.setState) {
      this.props.dataTableRef.setState({
        dataSource: [],
      });
    }
  }
  public downloadData(): void {
    const aTag = document.createElement('a');
    localforage.getItem('todolist_state').then((res) => {
      const blob = new Blob([JSON.stringify(res)]);
      const date = new Date();
      aTag.download = `notepad(${date.toLocaleDateString()}).txt`;
      aTag.href = URL.createObjectURL(blob);
      aTag.click();
      this.props.changeSettingPanel();
    });
  }
  public switchVisable( event: object ): void {
    // console.log(typeof(event));
    event.stopPropagation();
    this.props.changeSettingPanel();
  }
  public render() {
    return (
      <AppContext.Consumer>
        {({ toggleContent }) => {
          return (
            <div
              className={
                this.props.showPanel ? 'setting-panel show' : 'setting-panel'
              }
              onClick={toggleContent}
            >
              <div className="setting-panel-item">
                <Button
                  className="setting-panel-item_button"
                  onClick={toggleContent.bind(this.context, 0)}
                >
                  任务列表
                </Button>
              </div>
              <div className="setting-panel-item">
                <Button
                  className="setting-panel-item_button"
                  onClick={toggleContent.bind(this.context, 1)}
                >
                  数据统计
                </Button>
              </div>
              <div className="setting-panel-item">
                <Button
                  className="setting-panel-item_button"
                  onClick={this.downloadData}
                >
                  下载数据
                </Button>
              </div>
              <div className="setting-panel-item">
                <Button
                  className="setting-panel-item_button"
                  onClick={toggleContent.bind(this.context, 2)}
                >
                  导入数据
                </Button>
              </div>
              <div className="setting-panel-item">
                <Button
                  className="setting-panel-item_button"
                  onClick={this.clearData}
                >
                  清空数据
                </Button>
              </div>
              <div className="setting_sp_item">
                <Button
                  className="setting-panel-item_button"
                  onClick={this.switchVisable}
                >
                  伸缩
                </Button>
              </div>
            </div>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default SettingPanel;
