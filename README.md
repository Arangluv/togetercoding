## 프로젝트 주제 : 같이코딩 - 강의사이트
![같이코딩 임시로고](https://github.com/Arangluv/togetercoding/assets/90511789/fb369f1b-857c-4ed0-8f05-a49703fa38ea)
<br />
<br />
## 프로젝트 개요 및 제작배경
> **타 플랫폼에 종속적이지 않은 나만의 강의 사이트**
- 강의를 제작하고 업로드 및 관리할 수 있는 서비스입니다
  <br/>
  <br/>
- 다른 재능마켓, 강의 플랫폼에 종속적이지 않고, 본인만의 컨텐츠를 관리하기 위해 만들었습니다
  <br/>
  <br/>
## 서비스 동작
### 메인 페이지
<p align="center">
  <img src="https://github.com/Arangluv/togetercoding/assets/90511789/b0a070c2-264d-4249-8fd3-ffb4649a9174">
</p>

- 같이 코딩 사이트의 메인페이지 입니다


- 사이트를 설명해주는 텍스트는 빠른 개발을 위해 타 강의의 설명을 가져왔습니다 (배포 시 수정)

  <br/>
  <br/>
### 로그인
|로그인|이메일인증|
|---|---|
|![image](https://github.com/Arangluv/togetercoding/assets/90511789/8be3aec1-10a4-4090-8a92-f9daf0cdb900)|![image](https://github.com/Arangluv/togetercoding/assets/90511789/c5447138-7159-49b4-ab51-e22465c6a385)|
- 비밀번호를 입력하지 않고 가입한 이메일을 입력하면 유효성을 검사 후 해당 메일로 인증링크를 발송합니다


- 사용자가 **5분안에 링크를 클릭**하면 로그인이 진행됩니다

  <br/>
  <br/>
### 회원가입
|회원가입|이메일인증|
|---|---|
|![image](https://github.com/Arangluv/togetercoding/assets/90511789/2aac7296-b6fe-4883-acf1-538d95f30135)|![image](https://github.com/Arangluv/togetercoding/assets/90511789/96e8eff2-00fd-4227-80a5-afe2556084bb)|
- 비밀번호를 입력하지 않고 가입한 이메일을 입력하면 유효성을 검사 후 해당 메일로 인증링크를 발송합니다


- 사용자가 **5분안에 링크를 클릭**하면 회원가입이 진행됩니다

- 링크를 누르지않고, 로그인을 진행 시 다시 인증링크를 발송합니다
  
  <br/>
  <br/>
### 카카오톡 로그인 / 회원가입
<p align="center">
  <img src="https://github.com/Arangluv/togetercoding/assets/90511789/da697f08-5f41-49f6-b9b8-d2a3c79ecb78">
</p>

- OAuth 2.0 기반의 소셜 로그인 서비스


- 회원가입이 되어있지 않은 상태에서 카카오톡 로그인 버튼을 누르면 회원가입을 진행 후 로그인 시킵니다

  <br/>
  <br/>

### 대쉬보드
|전체|프로필사진이 있는 경우|
|---|---|
|![image](https://github.com/Arangluv/togetercoding/assets/90511789/f2017d4f-3e5a-4639-a65d-8b1b93c26686)|![image](https://github.com/Arangluv/togetercoding/assets/90511789/c8eca0d2-2f6f-4db5-af0c-824019dfe3c0)|

- 수강생들의 대쉬보드 화면으로 듣고있는 강의, 노트, 이슈, 구매내역, 프로필을 확인할 수 있습니다.

- 카카오톡 로그인 시 프로필사진이 있는 경우 자동으로 반영됩니다

  <br/>
  <br/>

### ADMIN PAGE
|메인화면|코스만들기|
|---|---|
|![image](https://github.com/Arangluv/togetercoding/assets/90511789/43fb9795-901d-4afb-8bc9-ce2e4df15e0f)|![image](https://github.com/Arangluv/togetercoding/assets/90511789/e2148017-9320-47bf-9dff-98a914c2074e)|

|강의 대주제 만들기|강의 소주제 만들기|
|---|---|
|![image](https://github.com/Arangluv/togetercoding/assets/90511789/bbff2918-cc36-4641-a7f7-d90b7a4aa194)|![image](https://github.com/Arangluv/togetercoding/assets/90511789/16e4ffd1-0e4c-451f-bd6b-96a58fdd5b3a)|

|소주제 수정|만든강의 불러오기|
|---|---|
|![image](https://github.com/Arangluv/togetercoding/assets/90511789/45b87170-7884-4009-8acc-598e45399091)|![image](https://github.com/Arangluv/togetercoding/assets/90511789/92ef3822-c513-49f2-b1e0-3cab87740f55)|

- admin 페이지에 접속하면 서버의 환경변수에 저장되어 있는 값과 로그인 정보를 비교하여 page를 렌더링합니다. 기본적으로 null을 return합니다

- 코스 제목, 설명, 가격, 썸네일 등을 입력하여 강의를 만들 수 있습니다

- 강의 대 / 소주제 만들기는 강의 목차와 세부적인 정보들을 생성할 수 있게합니다. github 주소를 입력 시 수강생들 화면에는 별도로 github url 버튼을 rendering합니다

- 강의 소주제에 대한 내용을 수정 및 삭제할 수 있습니다. 동영상을 수정 시 기존 AWS S3에 저장되어 있는 컨텐츠는 삭제합니다. 

- 만든 강의는 전체강의에 보여집니다

<br/>
<br/>
  
### 강의보기
|메인화면|코스만들기|
|---|---|
|![image](https://github.com/Arangluv/togetercoding/assets/90511789/43fb9795-901d-4afb-8bc9-ce2e4df15e0f)|![image](https://github.com/Arangluv/togetercoding/assets/90511789/e2148017-9320-47bf-9dff-98a914c2074e)|

|메인화면|코스만들기|asd|
|---|---|---|
|![image](https://github.com/Arangluv/togetercoding/assets/90511789/43fb9795-901d-4afb-8bc9-ce2e4df15e0f)|![image](https://github.com/Arangluv/togetercoding/assets/90511789/e2148017-9320-47bf-9dff-98a914c2074e)|![image](https://github.com/Arangluv/togetercoding/assets/90511789/e2148017-9320-47bf-9dff-98a914c2074e)|

- admin 페이지에 접속하면 서버의 환경변수에 저장되어 있는 값과 로그인 정보를 비교하여 page를 렌더링합니다. 기본적으로 null을 return합니다

- 코스 제목, 설명, 가격, 썸네일 등을 입력하여 강의를 만들 수 있습니다

- 강의 대 / 소주제 만들기는 강의 목차와 세부적인 정보들을 생성할 수 있게합니다. github 주소를 입력 시 수강생들 화면에는 별도로 github url 버튼을 rendering합니다

- 강의 소주제에 대한 내용을 수정 및 삭제할 수 있습니다. 동영상을 수정 시 기존 AWS S3에 저장되어 있는 컨텐츠는 삭제합니다. 

- 만든 강의는 전체강의에 보여집니다

<br/>
<br/>
  
