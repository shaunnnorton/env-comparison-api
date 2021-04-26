# Compare My Environment API

> An API for shareing your setup for development. Useful for trouble shooting when incompabilityies arise.

## Routes

The following routes can be used to access the api.

* ### /Users *Methods: [GET]*

  #### Parameters

    > start (*start=100*)

  #### Behavior

    > Returns the all users in the range specified by the query parameters.

  #### Response

   > * Format: JSON
   > * JSON:
   >   * ```{Data:[*ListofUsers*]}```

* ### /Users/{userid} *Methods: [GET,POST,PUT,DELETE]*

  #### Parameters

    > * userid (string)
    > * DATA (object) [POST,PUT]

  #### Behavior

    > * [GET] Returns user with the userid "userid".
    > * [POST] Creates a new user with the data provided in "DATA"
    > * [PUT] Updates a user with the data provided in "DATA"
    > * [Delete] Deletes user with userid "userid"

  #### Response

   > * Format: JSON
   > * JSON:
   >   * ```{User:UserObject}```


* ### /Users/{userid}/hardware *Methods: [GET,POST,PUT,DELETE]*

  #### Parameters

    > * userid (string)
    > * DATA (object) [POST,PUT]

  #### Behavior

    > * [GET] Returns users hardware for the userid "userid".
    > * [POST] Creates new hardware for user with the data provided in "DATA"
    > * [PUT] Updates a user's hardware with the data provided in "DATA"
    > * [Delete] Deletes user's hardware using data provided in "DATA"

  #### Response

   > * Format: JSON
   > * JSON:
   >   * ```{user:UserObject,hardware:[HardwareList]}```

* ### /Users/{userid}/software *Methods: [GET,POST,PUT,DELETE]*

  #### Parameters

    > * userid (string)
    > * DATA (object) [POST,PUT]

  #### Behavior

    > * [GET] Returns users software for the userid "userid".
    > * [POST] Creates new software for user with the data provided in "DATA"
    > * [PUT] Updates a user's software with the data provided in "DATA"
    > * [Delete] Deletes user's software using data provided in "DATA"

  #### Response

   > * Format: JSON
   > * JSON:
   >   * ```{user:UserObject,software:[SoftwareList]}```

* ### /hardware *Methods: [GET]*

  #### Parameters

    > * start (*start=100*)
    > * type [optional] (string)
    
  #### Behavior

    > Returns the all hardware in the range specified by the query parameters.

  #### Response

   > * Format: JSON
   > * JSON:
   >   * ```{Data:[*Listofhardware*]}```

* ### /software *Methods: [GET]*

  #### Parameters

    > * start (*start=100*)
    > * type [optional] (string)

  #### Behavior

    > Returns the all software in the range specified by the query parameters.

  #### Response

   > * Format: JSON
   > * JSON:
   >   * ```{Data:[*Listofsoftware*]}```