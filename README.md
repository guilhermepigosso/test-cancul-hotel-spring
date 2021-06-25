# Cancun Hotel

## MENU
* 1 - Introduction
* 2 - Acceptance Criterias
* 3 - Services Integration
* 4 - Database 
* 5 - Scripts Database
* 6 - Front-end side

# 1. Introduction
Cancun Hotel is a front-end project that access the Gateway and consumes it's services.

# 2. Acceptance Criterias
We expect from the system:
* Avoid downtimes;
* Allow user to see his bookings;
* Allow user to see available days for bookings;
* Allow user to book an available range of days from one to up to three days;
* Allow user to modify his current bookings; and
* Allow user to cancel his current bookings.

*We avoided downtimes with services doing a microservices environment, whoever, front-end service has nothing. One idea is to use a backup server and, in case of any issues, quickly swap the servers, but this and other possible solutions need to be further investigated!*

# 3. System flow
The image below shows the flow of the system:
![Front-end Flow](https://raw.githubusercontent.com/guilhermepigosso/test-cancun-hotel/master/docs/diagrams/system_flow.png)

Explaining the steps:
* 1- User Login: in the first screen, user can login into the system. Currently, only login is requested and we have three working fine: *sophia_jackson*, *emma_black* and *asmith*;
* 2- My Bookings: after login, user can see the screen My Bookings. Here, the user will be able to see all his bookings, and, if desired, manage them by *'Modify Booking' (4)* and *'Cancel Booking' (5)*. Also, after login, there is a menu available on top, with options: *My Bookings*, *Book* and *Logout*; 
* 3- Book: when clicked on menu *Book*, it shows the screen *New Booking*, with a calendar disabling the dates that are no longer available. To fill the calendar, it is required to use the Availability Service. If the user decide to finish the book, it is requested if he/she wants to receive an email as reminder for the booking; 
* 4- Modify Book: when clicked on icon *Modify Book*, it shows the screen *Change Booking*, with a calendar disabling the dates that are no longer available. To fill the calendar, it is required to use the Availability Service plus the days from the booking under cancelation. If the user decide to finish the book, it is requested if he/she wants to receive an email as reminder for the booking; and 
* 5- Cancel Book: when clicked on icon *Cancel Book*, it shows a modal for confirmation. If accepted, the service fetch the book, cancel it and refresh the user list. 
