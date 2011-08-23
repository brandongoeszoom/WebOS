#! /bin/sh

#
#Copyright 2009-2011 Mediafly, Inc.
#
#Licensed under the Apache License, Version 2.0 (the "License");
#you may not use this file except in compliance with the License.
#You may obtain a copy of the License at
#
#  http://www.apache.org/licenses/LICENSE-2.0
#
#Unless required by applicable law or agreed to in writing, software
#distributed under the License is distributed on an "AS IS" BASIS,
#WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#See the License for the specific language governing permissions and
#limitations under the License.
#

if [ "$1" == "help" ]; then
	echo "usage: build.sh COMMAND"
	echo "\nCommands"
	echo "  package      will create build.ipk"
	echo "  device       will build, uninstall, install, and launch app on device"
	echo "  emulator     will build, uninstall, install, and launch app on emulator (default)"
	echo ""
else
	rm *.ipk
	palm-package ./src/
	mv *.ipk build.ipk
	
	if [ $1 != "package" ]; then
		if [ "$1" = "device" ]; then
			d_option="usb"
		else 
			d_option="tcp"
		fi
	
		eval "palm-install -r -d $d_option com.mediafly.mediafly"
		eval "palm-install -d $d_option build.ipk"
		eval "palm-launch -d $d_option -i -p \"{debuggingEnabled:true}\" com.mediafly.mediafly-pre"
		rm *.ipk
	fi
fi 
