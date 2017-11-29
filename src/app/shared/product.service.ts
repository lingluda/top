import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {Http ,URLSearchParams} from "@angular/http";
import {
  HttpClient,
  HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse,
  HttpSentEvent, HttpUserEvent
} from "@angular/common/http";


@Injectable()
export class ProductService {
  searchEvent:EventEmitter<ProductSearchParams> = new EventEmitter();
 // private products:Product[] = [
  //  new Product(1,"汽车",1.99,3.5,"这是一部特斯拉",["汽车","电子产品"]),
  //  new Product(2,"汽车",1.99,2.5,"这是一部特斯拉",["汽车","电子产品"]),
  //  new Product(3,"汽车",1.99,1.5,"这是一部特斯拉",["汽车","电子产品"]),
  //  new Product(4,"汽车",1.99,4.5,"这是一部特斯拉",["汽车","电子产品"]),
 //   new Product(5,"汽车",1.99,1.5,"这是一部特斯拉",["汽车","电子产品"]),
 //   new Product(6,"汽车",1.99,4.5,"这是一部特斯拉",["汽车","电子产品"]),
 //  new Product(7,"汽车",1.99,5.5,"这是一部特斯拉",["汽车","电子产品"]),
 // ];
 // private comments:Comment[] =[
 //   new Comment(1,1,"2017-04-05 09:55:36","张三",1,"一般般"),
 //   new Comment(2,2,"2017-04-05 09:55:36","李四",4,"很好"),
//  new Comment(3,1,"2017-04-05 09:55:36","王五",2,"差评"),
 //   new Comment(4,2,"2017-04-05 09:55:36","赵六",5,"瑞或"),
 //   new Comment(5,1,"2017-04-05 09:55:36","李青",3,"满意"),
 //   new Comment(6,2,"2017-04-05 09:55:36","张八",6,"搞错"),
 // ];
        /*dataSource:Observable<any>;
        products:Array<any> = [];*/
  constructor(private http:Http) { }
  getProducts(): Observable<Product[]>{
    return this.http.get('/api/product/sort').map(res =>res.json())

  }
  getProduct(id:number):Observable<Product>{
    return this.http.get('/api/product/'+id).map(res =>res.json())
   //return this.http.get('/api/')
   /*console.log((product)=>product.id);
   return this.products.find((product)=>product.id==id);*/
 }
    getCommentsForProductId(id:number):Observable<Comment[]>{
       //return this.comments.filter((comment:Comment)=>comment.productId ==id);
      return this.http.get('/api/comment/sort').map(res =>res.json())
  }
  search(params:ProductSearchParams):Observable<Product[]>{
      return this.http.get('/api/product/findByName',{search: this.encodeParams(params)}).map(res =>res.json())

  }
  add(params:ProductSearchParams):Observable<Product[]>{
    return this.http.get('/api/product/save',{search: this.encodeParams(params)}).map(res =>res.json())

  }
  edit(id:number,params:ProductSearchParams):Observable<Product[]>{
    return this.http.get('/api/product/edit/'+id,{search: this.encodeParams(params)}).map(res =>res.json())

  }
  delete(id:number){
    return this.http.get('/api/product/delete/'+id).map(res =>res.json())

  }
  regist1(params:User):Observable<Product[]>{
    return this.http.get('/api/user/save',{search: this.encodeParams(params)}).map(res =>res.json())

  }
  login(name:number):Observable<User[]>{
    return this.http.get('/api/user/login'+name).map(res =>res.json())

  }
  private encodeParams(params: ProductSearchParams) {
   /*  let result:URLSearchParams;
     result.append(params);*/
    return Object.keys(params).filter(key=>params[key]).reduce((sum:URLSearchParams,key:string) =>
    {sum.append(key,params[key]);
      return sum;
    },new URLSearchParams());
    //return result;
  }
}
export class User{
  constructor(
    // public keyword:string,
    public name:string,
    public password:string,

  ){
  }
}

export class ProductSearchParams{
  constructor(
   // public keyword:string,
    public name:string

  ){
  }
}

export class Product{
  constructor(
    public id:number,
    public name:string,
    public p_price:number,
    public p_rating:number,
    public p_desc:string,
    public p_fatherId:number
  ){

  }
}
export class Comment{
  constructor(
    public id:number,
    public productId:number,
    public timestamp:string,
    public user:string,
    public rating:number,
    public content:string
  ){

  }
}


export class JWTInterceptor implements HttpInterceptor {
//private notifySrv:NotifyService
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    //console.log('interceptor111111111111111111111111111111111')
    const jwtReq = req.clone({
      headers: req.headers.set('token', 'da11111111111111111111111111111111111')
    });
    return next
      .handle(jwtReq)
      .mergeMap((event: any) => {
        if (event instanceof HttpResponse && event.body.code !== 0) {
          return Observable.create(observer => observer.error(event));
        }
        return Observable.create(observer => observer.next(event));
      })
      .catch((res: HttpResponse<any>) => {
        switch (res.status) {
          case 401:
            // 权限处理
            location.href = ''; // 重新登录
            break;
          case 500:
            // 业务层级错误处理
            console.log('\'业务错误\', `错误代码为11111111111111111111111111111');
            //this.notifySrv.error('业务错误', `错误代码为：${res.body.code}`);
            break;
          case 404:
            console.log('\'业务错误\', `错误代码为');
            //this.notifySrv.error('404', `API不存在`);
            break;
        }
        // 以错误的形式结束本次请求
        return Observable.throw(res);
      })
  }
}

