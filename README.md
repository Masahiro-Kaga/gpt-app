// SCSSインストール済み。ファイルも作成済み。だが、やはりemotion/styledでやろうと思っている。
// BGイメージ、SVGにするか、ボヤけてるから。ロゴは逆にSVGからJPEGにするか。
// ページ読み込み時に何かかっこいいアニメーションが欲しい。
// ログイン機能、sessionを用いて。
// ホーム画面も同じく、バックグラウンドで何かロボットの絵とか説明とか。
// Video 3:45:36、次はImage Variationの部分。

GPT App

使用モデル
	・GPT-3.5 : 自然言語とコードを理解および生成する最新モデル。
	・DALL-E : 自然言語から画像を生成・編集するモデル
	・Whisper : 音声をテキストに変換するモデル
	<!-- ・Embeddings : 埋め込み (ベクトル表現) を生成するモデル -->
	<!-- ・Codex : コードを理解および生成するモデル -->
	<!-- ・Moderation : センシティブおよび 安全でない文章を検出するモデル -->


作業
- [ ]: Headerのデザイン
- [ ]: Sidebarのデザイン
- [ ]: 全ページのベース作成とRooterを設定
- [ ]: Footerのデザイン
- [ ]: Login機能
- [ ]: データベースの構築
- [ ]:
- [ ]:


[GPT-3.5]
- [ ]: ページデザイン
- [ ]: サイドメニューの設定項目


[DALL-E]
- [ ]: ページデザイン
- [ ]: サイドメニューの設定項目
- [ ]: Loading機能
- [ ]: 画像ダウンロード機能
- 


[Whisper]
- [ ]: ページデザイン
- [ ]: サイドメニューの設定項目




Localでmongodbを起動する。
 - brew services start mongodb/brew/mongodb-community
Mongo bashを利用する。
 - (mongodbを起動後)mongosh
Localでmongodbを停止する。
 - brew services stop mongodb/brew/mongodb-community
Localでmondodbが動いてるかどうか確認する。
 - brew services list

mongo compassで、ローカルでmongo動かしてて、接続切るの忘れてcompass経由でDockerのmongoにアクセスしようとしたら、authentication failedになる。authentication情報は正しいのに、そういう文言になるので、注意。

compassで繋げるときのURL
docker　 mongodb://root:gpt_mongo@localhost:27017/dev?authMechanism=DEFAULT&authSource=admin&directConnection=true
ローカル　mongodb://localhost:27017/dev
dockerはmongo:27017で繋がってるけど、ローカルから繋げる時はフォワードされてるから、オリジナルのlocalhost:20717で接続する。

dockerのyml直した時に、特にmongoの部分だと、docker downしてもキャッシュが残ってしまう場合あるので、docker-compose down -vで捨てること。

mkcertの利用も検討。
helmetも。


CSSの定義！！！
	MUIを使うとき→使い回して、いろんなところで使う部品・コンポーネントがあるとき。
	その他はemotionsで。
	枠操作、ボックス操作、一列だけのものについては、tailwindで。
	
constants.tsが読み込めない！訳がわからん、axiosConfigな.tsならいけてる。
	import { testString } from "src/client/constants"; 
	普通にwebpackでsrc/*とかの処理もされてるし、そもそもaxiosConfigなら同じ方法かつ同じようなパス指定でいけてるし。
	->ESではできた。const { testString } = require('../../constants');として残しておきます。constants.tsも合わせて。
	ERROR in Entry module not found: Error: Can't resolve './src'　はwebpackの問題っぽい
	同じ階層で相対パスだとうまくいく。/src/から始めると上手くいかない。

これからウェブサイトをブラッシュアッぷする時はCRAで簡単なもの作って同時に走らせて、テスト用に。

React Dev Toolもつかいたい！！！！