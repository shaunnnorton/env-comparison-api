# Compare My Environment API

> An API for shareing your setup for development. Useful for trouble shooting when incompabilityies arise.

## Routes

The following routes can be used to access the api.

### /Users *Methods: [GET]*

  __Parameters__

  > [__QUERY__] amount (*amount=100*) *how many users to return*

  __Behavior__

  > Returns random users to the amount specified in the query parameter

  __Response__

   > * Format: JSON
   > * JSON:
   >   * ```{Response:(Status),DATA:{Users:[User1,...]}}```

### /Users/{userid} *Methods: [GET,POST,PUT,DELETE]*

  __Parameters__

  > * userid (string) [all methods] *The userid/username of the user you are looking for* 
  > * [__BODY__] DATA (object) for [POST,PUT,DELETE] *Data provided to update create or delete a User*
  >   * [PUT] {DATA:{userpassword:(userpassword),changes:{username:(username), password:(password)}}}
  >   * [POST,DELETE] {DATA:{changes:{username:(username), password:(password)}}}

  __Behavior__

  > * [GET] Returns user with the userid "userid".
  > * [POST] Creates a new user with the data provided in "DATA"
  > * [PUT] Updates a user with the data provided in "DATA"
  > * [DELETE] Deletes user with userid "userid"

  __Response__
   > * [GET,POST,PUT,DELETE]
   >   * Format: JSON
   >   * JSON:
   >     * ```{Response:(Status),DATA:{User:{_id:(objectId), username:(username), software:[(list_of_software)], hardware:[(list_of_hardware)]}}}```

### /Users/{userid}/hardware *Methods: [GET,POST,PUT,DELETE]*

  __Parameters__

  > * userid (string) *The user to return the hardware from* 
  > * [__BODY__] DATA (object) [POST,PUT,DELETE] *The Hardware to create update or delete to/from the user* 
  >   * {DATA:{userpassword:(userpassword) ,changes:{type:(Computer,Mouse,Monitor,GPU,CPU), name:(e.g. MackbookPro), specs:(e.g. 2.4Ghz)}}}

  __Behavior__

  > * [GET] Returns user's hardware for the userid "userid".
  > * [POST] Creates new hardware for user with the data provided in "DATA"
  > * [PUT] Updates a user's hardware with the data provided in "DATA"
  > * [DELETE] Deletes user's hardware using data provided in "DATA"

  __Response__

   > * Format: JSON
   > * JSON:
   >   * ```{Response:(Status),DATA:{user:UserObject, hardware:[HardwareList]}}```

### /Users/{userid}/software *Methods: [GET,POST,PUT,DELETE]*

  __Parameters__

  > * userid (string) *The user to return the software from*
  > * [__BODY__] DATA (object) [POST,PUT,DELETE] *The Software to create update or delete to/from the user* 
  >   * {DATA:{userpassword:(userpassword) ,changes:{type:(OS,Framework,IDE,etc.), name:(e.g. VSCode), version:(10.11.2)}}}

  __Behavior__

  > * [GET] Returns user's software for the userid "userid".
  > * [POST] Creates new software for user with the data provided in "DATA"
  > * [PUT] Updates a user's software with the data provided in "DATA"
  > * [DELETE] Deletes user's software using data provided in "DATA"

  __Response__

   > * Format: JSON
   > * JSON:
   >   * ```{Response:(Status),DATA:{user:UserObject,software:[SoftwareList]}}```

### /hardware *Methods: [GET]*

  __Parameters__

  > * [__QUERY__] amount (int) *The number of results to return*
  > * [__QUERY__] type (string) *The type of hardware to return*
    
  __Behavior__

  > Returns the all hardware of the type specified by the query parameters.

  __Response__

   > * Format: JSON
   > * JSON:
   >   * ```{Response:(Status),DATA:{hardware:[*Listofhardware*]}}```

### /software *Methods: [GET]*

  __Parameters__
  > * [__QUERY__] amount (int) *The number of results to return*
  > * [__QUERY__] type (string) *The type of software to return*

  __Behavior__

  > Returns the all software of the type by the query parameters.

  __Response__

   > * Format: JSON
   > * JSON:
   >   * ```{Response:(Status),DATA:{software:[*Listofsoftware*]}}```

## Examples

  * __Users__
    * [GET] ```/Users/?amount=100```
  
  *  __Users/:Userid__
    * [GET] ```/users/sampleuser```
    * [POST] ```/users/sampleuser```
      * Request Body {DATA:{changes:{username:sampleuser, password:realpassword}}}
    * [PUT] ```/users/sampleuser```
      * Request Body {DATA:{userpassword:realpassword,changes:{username:computerlover77}}
    * [DELETE] ```/users/sampleuser```
      * Request Body {DATA:{userpassword:realpassword,changes:{username:sampleuser, password:realpassword}}}

  *  __Users/:Userid/hardware__
    * [GET] ```/users/sampleuser/hardware```
    * [POST] ```/users/sampleuser/hardware```
      * Request Body {DATA:{userpassword:realpasswrod ,changes:{type:Computer, name:MackbookPro, specs:2.4Ghz}}}
    * [PUT] ```/users/sampleuser/hardware```
      * Request Body {DATA:{userpassword:realpasswrod ,changes:{type:Computer, name:MackbookPro, specs:2.4Ghz}}}
    * [DELETE] ```/users/sampleuser/hardware```
      * Request Body {DATA:{userpassword:realpasswrod ,changes:{type:Computer, name:MackbookPro, specs:2.4Ghz}}}

  * __Users/:Userid/software__
    * [GET] ```/users/sampleuser/software```
    * [POST] ```/users/sampleuser/software```
      * Request Body {DATA:{userpassword:realpassword ,changes:{type:IDE, name:VSCode, version:10.11.2}}}
    * [PUT] ```/users/sampleuser/software```
      * Request Body {DATA:{userpassword:realpassword ,changes:{type:IDE, name:VSCode, version:10.11.2}}}
    * [DELETE] ```/users/sampleuser/software```
      * Request Body {DATA:{userpassword:realpassword ,changes:{type:IDE, name:VSCode, version:10.11.2}}}

  * __hardware__
    * [GET] ```/hardware/?type=computer&amount=6```

  * __software__
    * [GET] ```/software/?type=OS&amount=9```