# Compare My Environment API

> An API for shareing your setup for development. Useful for trouble shooting when incompabilityies arise.

## Routes

The following routes can be used to access the api.

* ### /Users *Methods: [GET]*

  #### Parameters

    > amount (*amount=100*) *how many users to return*

  #### Behavior

    > Returns random users to the amount specified in the query parameter

  #### Response

   > * Format: JSON
   > * JSON:
   >   * ```{Users:[User1,...]}```

* ### /Users/{userid} *Methods: [GET,POST,PUT,DELETE]*

  #### Parameters

    > * userid (string) [all methods] *The userid/username of the user you are looking for* 
    > * DATA (object) for [POST,PUT,DELETE] *Data provided to update create or delete a User*
    >   * {username:<username>, password:<password>}

  #### Behavior

    > * [GET] Returns user with the userid "userid".
    > * [POST] Creates a new user with the data provided in "DATA"
    > * [PUT] Updates a user with the data provided in "DATA"
    > * [Delete] Deletes user with userid "userid"

  #### Response
   > * [GET]
   >   * Format: JSON
   >   * JSON:
   >     * ```{User:UserObject}```

* ### /Users/{userid}/hardware *Methods: [GET,POST,PUT,DELETE]*

  #### Parameters

    > * userid (string) *The user to return the hardware from* 
    > * DATA (object) [POST,PUT,DELETE] *The Hardware to create update or delete to/from the user* 
    >   * {type:(Computer,Mouse,Monitor,GPU,CPU), name:(e.g. MackbookPro), specs:(e.g. 2.4Ghz)}

  #### Behavior

    > * [GET] Returns user's hardware for the userid "userid".
    > * [POST] Creates new hardware for user with the data provided in "DATA"
    > * [PUT] Updates a user's hardware with the data provided in "DATA"
    > * [Delete] Deletes user's hardware using data provided in "DATA"

  #### Response

   > * Format: JSON
   > * JSON:
   >   * ```{user:UserObject, hardware:[HardwareList]}```

* ### /Users/{userid}/software *Methods: [GET,POST,PUT,DELETE]*

  #### Parameters

    > * userid (string) *The user to return the software from*
    > * DATA (object) [POST,PUT,DELETE] *The Software to create update or delete to/from the user* 
    >   * {type:(OS,IDE,Framwork), name:(e.g. VSCode), version:(e.g. 10.1)}

  #### Behavior

    > * [GET] Returns user's software for the userid "userid".
    > * [POST] Creates new software for user with the data provided in "DATA"
    > * [PUT] Updates a user's software with the data provided in "DATA"
    > * [Delete] Deletes user's software using data provided in "DATA"

  #### Response

   > * Format: JSON
   > * JSON:
   >   * ```{user:UserObject,software:[SoftwareList]}```

* ### /hardware *Methods: [GET]*

  #### Parameters

    > * amount (int) *The number of results to return*
    > * type (string) *The type of hardware to return*
    
  #### Behavior

    > Returns the all hardware of the type specified by the query parameters.

  #### Response

   > * Format: JSON
   > * JSON:
   >   * ```{hardware:[*Listofhardware*]}```

* ### /software *Methods: [GET]*

  #### Parameters

    > * amount (int) *The number of results to return*
    > * type (string) *The type of software to return*

  #### Behavior

    > Returns the all software of the type by the query parameters.

  #### Response

   > * Format: JSON
   > * JSON:
   >   * ```{software:[*Listofsoftware*]}```