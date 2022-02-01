function onAffCommand(timing, duration, x, y, z, easeX, easeY, easeZ, isBounce)
    notes = getNoteGroup()
    oldPos = notes.getTranslationAt(timing-1)
    register(notes, timing, duration, "MoveNotes")
end

function MoveNotes(timing, duration, x, y, z, easeX, easeY, easeZ, isBounce)
    local newX, newY, newZ, percentage
    if isBounce == 1 then
        percentage  = 1 - math.abs(1 - 2 * ((timing - BaseTiming) / duration))
    else
        percentage  = (timing - BaseTiming) / duration
    end

    local LocalX = x * -8.5
    local LocalY = y * 4.5
    local LocalZ = z

    if     easeX==0 then
        newX = Ease.Linear(oldPos.x, LocalX, percentage)
    elseif easeX==1 then
        newX = Ease.OutSine(oldPos.x, LocalX, percentage)
    elseif easeX==2 then
        newX = Ease.InSine(oldPos.x, LocalX, percentage)
    elseif easeX==3 then
        newX = Ease.InOutSine(oldPos.x, LocalX, percentage)
    end

    if     easeY==0 then
        newY = Ease.Linear(oldPos.y, LocalY, percentage)
    elseif easeY==1 then
        newY = Ease.OutSine(oldPos.y, LocalY, percentage)
    elseif easeY==2 then
        newY = Ease.InSine(oldPos.y, LocalY, percentage)
    elseif easeY==3 then
        newY = Ease.InOutSine(oldPos.y, LocalY, percentage)
    end

    if     easeZ==0 then
        newZ = Ease.Linear(oldPos.z, LocalZ, percentage)
    elseif easeZ==1 then
        newZ = Ease.OutSine(oldPos.z, LocalZ, percentage)
    elseif easeZ==2 then
        newZ = Ease.InSine(oldPos.z, LocalZ, percentage)
    elseif easeZ==3 then
        newZ = Ease.InOutSine(oldPos.z, LocalZ, percentage)
    end
    notes.setTranslation(newX, newY, newZ)
end