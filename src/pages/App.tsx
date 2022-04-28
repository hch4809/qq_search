import React, {useState, useEffect, useRef} from 'react';
// import styles from './app.module.sass';
import styles from './index.module.less';
import searchImg from '../asset/search.png';

import http from './http';



let timer: any;
let controller: any;
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const ref = useRef(null)
  const [search, setSearch] = useState<string>('');
  const [qqInfo, setQQInfo] = useState<any>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);

  // 防抖
  const debounce = (time: number, search:string) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // 全删的时候 不再请求后端接口 
      search&&getData(search);
      !search&&setQQInfo({});

      clearTimeout(timer)
    }, time);
  }


  // input 实时变化
  const getResult = (e: any) => {
    setSearch(e?.target?.value);
    debounce(500, e?.target?.value)
  }

  // 获取数据
  const getData = (str?: string):void => {
    // 终止上一次的请求
    controller?.abort();
    controller = new AbortController();
    const { signal } = controller;

    setLoad(true);
    // 发起新的请求；
    http.get('https://api.uomg.com/api/qq.info', {qq: str || search}, {signal})
    .then((data: any) => {
      if(data?.code == 1){
        setQQInfo({...data})
      }else{
        setQQInfo({});
      }
    }).catch((err: any) => {
      console.log(err)
    }).finally((fin:any) => {
      controller = null;
      setLoad(false)
    })
  }

  // 打开下拉框
  const closeModal = (e: any): void => {
    if(e.target.className.includes('box')){
      setIsOpen(false);
    }
  }

  // 删除 input框内容
  const clear = () => {
    setSearch(''); 
    (ref?.current as any).focus()
  }



  return (
    <div className={styles.box} onClick={closeModal}>
      <div className={styles.search}>
        <input className={`${styles.input} ${isOpen? styles.focus: null}`} value={search}
         onInput={(e:any) => {getResult(e)}}
         placeholder='请输入QQ号搜索'  ref={ref}
         onFocus={()=>{setIsOpen(true)}} />
        {!search && <i className='iconfont icon-search'></i>}
        {search && <i className={'iconfont icon-delete ' + styles.clear} onClick={clear}></i>}
      </div>

      {isOpen&&<div className={styles.item}>
        {/* loading 遮罩层 */}
        {load && <div className={styles.mark}>
          <i className='iconfont icon-loading'></i>
          <div>努力搜索中，请稍后......</div>
        </div>}
        {/* 展示搜索结果 */}
        {search !== ''&&qqInfo.qq&&<div className={styles.content}>
          <img src={qqInfo.qlogo} alt="" />
          <div>
            <div>{qqInfo.name}</div>
            <div>{qqInfo.qq}</div>
          </div>
        </div>}
        {/* 没有搜索结果 或者 搜索条件为空时 */}
        {(!search||!qqInfo.qq)&&!load&&<div className={styles.empty}>
          <i className={'iconfont icon-' + (search===''?'searchlist':'empty')} ></i>
          <div>{search ===''?'快去输入QQ号进行检索吧！':'没有匹配数据，您可以尝试修改QQ号！'}</div>
        </div>}
      </div>}
    </div>
  );
}

