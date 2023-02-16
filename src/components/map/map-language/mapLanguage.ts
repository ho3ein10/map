// Leaflet Framework:
import L from "leaflet";

L.drawLocal.draw.toolbar.actions.title = "لغو ترسیم ";
L.drawLocal.draw.toolbar.actions.text = "لغو";
L.drawLocal.draw.toolbar.finish.title = "اتمام ترسیم";
L.drawLocal.draw.toolbar.finish.text = "اتمام";
L.drawLocal.draw.toolbar.undo.title = "حذف آخرین نقطه ی ترسم  شده";
L.drawLocal.draw.toolbar.undo.text = "حذف اخرین نقطه";
L.drawLocal.draw.toolbar.buttons.polyline = "رسم چند خطی";
L.drawLocal.draw.toolbar.buttons.polygon = "رسم چندضلعی";
L.drawLocal.draw.toolbar.buttons.rectangle = "رسم مستطیل";
L.drawLocal.draw.toolbar.buttons.circle = "رسم دایره";
L.drawLocal.draw.toolbar.buttons.marker = "رسم نشانه گذار";
L.drawLocal.draw.toolbar.buttons.circlemarker = "رسم نشانگر دایره ای";

L.drawLocal.draw.handlers.circle.tooltip.start =
  "جهت  رسم دایره کلیک کنید و بکشید";
L.drawLocal.draw.handlers.circle.radius = "شعاع";
L.drawLocal.draw.handlers.circlemarker.tooltip.start =
  "جهت قراردادن دایره روی نقشه کلیک کنید";
L.drawLocal.draw.handlers.marker.tooltip.start =
  "جهت قراردادن نشانگر روی نقشه کلیک کنید";
L.drawLocal.draw.handlers.polygon.tooltip.start = "جهت رسم شکل کلیک کنید";
L.drawLocal.draw.handlers.polygon.tooltip.cont =
  "جهت ادامه ترسیم شکل کلیک کنید";
L.drawLocal.draw.handlers.polygon.tooltip.end =
  "نقطه ی ابتدایی را جهت بسته شدن شکل کلیک کنید";
L.drawLocal.draw.handlers.polyline.error =
  "<strong>Error:</strong> shape edges cannot cross!";
L.drawLocal.draw.handlers.polyline.tooltip.start = "جهت رسم خط کلیک کنید";
L.drawLocal.draw.handlers.polyline.tooltip.cont =
  "جهت ادامه ترسیم خط کلیک کنید";
L.drawLocal.draw.handlers.polyline.tooltip.end =
  "نقطه ی ابتدایی را جهت اتمام خط کلیک کنید";
L.drawLocal.draw.handlers.rectangle.tooltip.start =
  "جهت ترسیم مستطیل کلیک و درگ کنید";
L.drawLocal.draw.handlers.simpleshape.tooltip.end =
  "جهت اتمام ترسیم موس را رها کنید";

L.drawLocal.edit.toolbar.actions.save.title = "ذخیره ی تغییرات";
L.drawLocal.edit.toolbar.actions.save.text = "ذخیره";
L.drawLocal.edit.toolbar.actions.cancel.title =
  "لغو ویرایش، نادیده گرفتن تغییرات قبلی";
L.drawLocal.edit.toolbar.actions.cancel.text = "لغو";
L.drawLocal.edit.toolbar.actions.clearAll.title = "پاک کردن تمامی لایه ها";
L.drawLocal.edit.toolbar.actions.clearAll.text = "پاک کردن";
L.drawLocal.edit.toolbar.buttons.edit = "ویرایش لایه ها";
L.drawLocal.edit.toolbar.buttons.editDisabled =
  "هیچ لایه ای جهت ویرایش وجود ندارد";
L.drawLocal.edit.toolbar.buttons.remove = "حذف لایه ها";
L.drawLocal.edit.toolbar.buttons.removeDisabled =
  "هیچ لایه ای جهت حذف وجود ندارد";

L.drawLocal.edit.handlers.edit.tooltip.text =
  "دستگیره ها، یا نشانگر را برای ویرایش فیچر بکشید";
L.drawLocal.edit.handlers.edit.tooltip.subtext =
  "جهت نادیده درنظرگفتن تغییرات دکمه لغو  را کلیک کنید";
L.drawLocal.edit.handlers.remove.tooltip.text =
  "جهت پاک شدن فیچر روی آن کلیک کنید";
