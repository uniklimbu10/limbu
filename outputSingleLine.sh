#!/bin/bash
# File: outputSingeLine.sh
# Created: 2020-09-02 by Simon Jolly
# Version: 0.1
#
# Extract last line from CSV file and output to new file.
#
# outputSingleLine.sh [-h -v] sourceFile targetFile [waitTime]
#
# Options:
#   -h: display help information
#   -v: verbose display of each written line

# Define usage

usage()
{
cat << EOF
usage: $0 [-c -h -v] sourceFile targetFile [waitTime]

Extract last line from CSV file and output to new file

OPTIONS:
  -c      Display number of lines written to source file per second
  -h      Show this message
  -v      Verbose mode: display data as its written

EOF
}

# Parse input arguments

VERBOSE=
VERBFLAG=
COUNTLINES=

while getopts “chv” OPTION
do
  case $OPTION in
    c)
    #Display lines written
      COUNTLINES=$OPTION
      ;;
    h)
      usage
      exit
      ;;
    v)
    #each -v should increase verbosity level
      VERBOSE+=$OPTION
      ;;
    *)
      echo "Error: unrecognized option: -$OPTION"
      usage
      exit 1
      ;;
  esac
done

shift $((OPTIND-1))

[ "$1" = "--" ] && shift

# Check input arguments

#if [[ $COUNTLINES && $VERBOSE ]]
#then
#  echo -e "\e[31mWarning: cannot specify verbose and count flags. Overriding verbose flag...\e[0m"
#fi
#
#if [[ $COUNTLINES ]]
#then
#  VERBOSE=
#fi
#
#if [[ $VERBOSE ]]
#then
#  VERBFLAG="-$VERBOSE"
#fi

SOURCEFILE=$1
TARGETFILE=$2
WAITTIME=$3

if [[ -z $TARGETFILE ]]
then
  echo "Error: must specify a file to write to"
  exit 1
fi

if [[ -z $SOURCEFILE ]]
then
  echo "Error: must specify a file to read from"
  exit 1
fi

if [[ -z $WAITTIME ]]
then
  WAITTIME=0.02
fi

SOURCEFILE=$(readlink -f $SOURCEFILE)
TARGETFILE=$(readlink -f $TARGETFILE)

echo "Writing single line from $SOURCEFILE to $TARGETFILE ..."

# Read last line in input file and output to output file

OLDLINES=0
OLDTIME=0
while [ true ] ; do
  NANOTIME=$(date +%s%N)
  NUMLINES=($(wc -l $SOURCEFILE))
  NUMLINES=${NUMLINES[0]}
  NEWLINES=$((NUMLINES-OLDLINES))
  LOOPDURATION=$((($NANOTIME - $OLDTIME)/1000000))
  LOOPRATE=$(echo "1000 / $LOOPDURATION" | bc)
#  LPS=$(echo "$NEWLINES * $LOOPRATE" | bc)
  LPS=$(echo "1000 * $NEWLINES / $LOOPDURATION" | bc)
  if [[ $VERBOSE ]]
  then
    tail -n 1 $SOURCEFILE | tee $TARGETFILE
    if [[ $COUNTLINES ]]
    then
      echo "Source file $SOURCEFILE contains $NEWLINES new lines written at rate $LPS Hz"
#      echo "Wait time: $WAITTIME; new lines: $NEWLINES; old lines: $OLDLINES; lines per second $LPS Hz"
#      echo "Loop duration: $LOOPDURATION; loop rate: $LOOPRATE Hz"
    fi
  else
    if [[ $COUNTLINES ]]
    then
      printf '\rSource file %s contains %s new lines written at rate %s Hz       ' "$SOURCEFILE" "$NEWLINES" "$LPS"
    fi
    tail -n 1 $SOURCEFILE > $TARGETFILE
  fi
  sleep $WAITTIME
  OLDLINES=$((OLDLINES+NEWLINES))
  OLDTIME=$NANOTIME
done
